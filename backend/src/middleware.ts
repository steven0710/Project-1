import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  console.log("Authorization header:", req.headers.authorization);
  console.log("Extracted token:", token);
  console.log("JWT_SECRET:", JWT_SECRET);

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).user = decoded; // attach userId to req object
    next(); // continue to route handler
  } catch (err) {
    console.log("JWT verification error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

import { User } from "../models/user.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      password,
      email: email.toLowerCase(),
    });

    res.status(201).json({
      message: "User registered successfully",
      id: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await user.comparePasswords(password);
    console.log(password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );
    res.status(200).json({
      message: "Login successful",
      username: user.username,
      token: token,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};
const logoutUser = async (req: Request, res: Response) => {
  try {
    // Implement logout logic (e.g., invalidate token, clear session)
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};
export { registerUser, loginUser, logoutUser };

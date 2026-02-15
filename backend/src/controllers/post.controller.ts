import { Request, Response } from "express";
import { Job } from "../models/jobs.model";

export const createJob = async (req: Request, res: Response) => {
  try {
    const { title, company, employmentType, status } = req.body;

    // Take userId directly from the verified JWT
    const userId = (req as any).user.userId; // safe, authMiddleware guarantees it

    // Create job with userId attached
    const job = await Job.create({
      title,
      company,
      employmentType,
      status,
      userId,
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

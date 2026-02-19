import { Response } from "express";
import { Job } from "../models/jobs.model";
import { AuthRequest } from "../types/auth-request";

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    const { title, company, employmentType, status } = req.body;

    if (!req.user?.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Take userId directly from the verified JWT
    const userId = req.user.userId;

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

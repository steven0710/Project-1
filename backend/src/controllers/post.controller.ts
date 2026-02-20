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

export const getAllJobs = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const jobs = await Job.find({ userId: req.user.userId });
    return res.status(200).json({ message: "Jobs retrieved", jobs: jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const getJob = await Job.findOne({
      _id: req.params.id,
      userId: req.user.userId, // Ensure the job belongs to the authenticated user
    });

    if (!getJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Job retrieved", job: getJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// export const updateJob = async (req: AuthRequest, res: Response) => {
//   try {
//     if (!req.user?.userId) {
//       return res.status(401).json({ message: "Not authorized" });
//     }
//     const allowedFields = [
//       "title",
//       "company",
//       "employmentType",
//       "status",
//     ] as const;
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    // const { title, company, employmentType, status } = req.body;

    if (!req.user?.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // console.log(req.params.id);
    // console.log(req.user.userId);
    const deleteJob = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId, // Ensure the job belongs to the authenticated user
    });

    if (!deleteJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Job deleted", job: deleteJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

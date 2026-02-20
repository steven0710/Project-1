import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
} from "../controllers/post.controller";
import { authMiddleware } from "../middleware";

const jobRouter = Router();

jobRouter.route("/create").post(authMiddleware, createJob); // protected route
jobRouter.get("/", authMiddleware, getAllJobs);
jobRouter.get("/:id", authMiddleware, getJobById);
// jobRouter.patch("/:id", authMiddleware, updateJob);
jobRouter.delete("/:id", authMiddleware, deleteJob);

export default jobRouter;

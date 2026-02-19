import { Router } from "express";
import { createJob, deleteJob, getJobs } from "../controllers/post.controller";
import { authMiddleware } from "../middleware";

const jobRouter = Router();

jobRouter.route("/create").post(authMiddleware, createJob); // protected route
jobRouter.get("/", authMiddleware, getJobs);
jobRouter.delete("/:id", authMiddleware, deleteJob);

export default jobRouter;

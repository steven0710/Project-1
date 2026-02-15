import { Router } from "express";
import { createJob } from "../controllers/post.controller";
import { authMiddleware } from "../middleware";

const jobRouter = Router();

jobRouter.route("/create").post(authMiddleware, createJob); // protected route
export default jobRouter;

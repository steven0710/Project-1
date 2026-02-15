import express from "express";
import userRouter from "./routes/user.route";
import jobRouter from "./routes/job.route";
const app = express(); // create an express app

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter); // add job routes
// app.use("/api/v1/post", userRouter);

//https://localhost:5000/api/v1/users/register
export default app;

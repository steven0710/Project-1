import express from "express";
const app = express(); // create an express app

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});
export default app;

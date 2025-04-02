import express, { NextFunction, Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/hello", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "hello, welcome to project" });
});

export default app;

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));

// app.use('/', (req, res) => {
//   res.json({ project: 'Project 03', status: 'healthy' })
// })

app.get("/hello", (req: Request, res: Response, next: NextFunction) => {
  console.log("Hello");
  res.status(200).json({ message: "hello, welcome to project" });
});

export default app;

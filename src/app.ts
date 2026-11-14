import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

const origin = process.env.CLIENT_URL || 'http://localhost:3000';

const app = express();
app.use(express.json());

app.use(cors({
  origin: String(origin),
  credentials: true
}));


app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));



export default app;

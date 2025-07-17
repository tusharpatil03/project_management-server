import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));


app.get('/hello', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'hello, welcome to project' });
});


export default app;

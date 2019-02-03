import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import consumptionRouter from './routes/consumption';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/consumption', consumptionRouter);

app.use((err: any, req: Request, res: Response) => {
  res.locals.message = err.message;
  return res.status(err.status || 500).send(err.details);
});

export default app;

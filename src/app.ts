import express, { Request, Response } from 'express';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import path from 'path';

import consumptionRouter from './routes/consumption';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../', 'public', 'favicon.ico')));

app.use('/truth', (req: Request, res: Response) => res.status(418).send('Elian === Cool dev'));
app.use('/consumption', consumptionRouter);
app.get('*', (req: Request, res: Response) => res.status(404).send('Nothing over here'));
app.use(errors());
app.use((err: any, req: Request, res: Response) => {
  res.locals.message = err.message;
  return res.status(err.status || 500).send(err.details);
});

export default app;

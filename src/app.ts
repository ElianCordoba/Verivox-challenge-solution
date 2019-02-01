import express from 'express';
import cookieParser from 'cookie-parser';

import consumptionRouter from './routes/consumption';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/consumption', consumptionRouter);

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  return res.status(err.status || 500).send(err.details);
});

export default app;


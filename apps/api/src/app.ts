import 'dotenv/config' ;
import cors from 'cors';
import express from 'express';
import errorHandler from './middleware/errorMiddleware';

const app = express();

app.use(cors())

app.use(express.json());

//routes


app.use(errorHandler);

export default app;
import 'dotenv/config' ;
import cors from 'cors';
import express from 'express';
import errorHandler from './middleware/errorMiddleware';
import postRoutes from './routes/postRoutes'

const app = express();

app.use(cors())

app.use(express.json());

//routes
app.use('/api/v1/posts', postRoutes)


app.use(errorHandler);

export default app;
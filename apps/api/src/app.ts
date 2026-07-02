import 'dotenv/config' ;
import cors from 'cors';
import express from 'express';
import errorHandler from './middleware/errorMiddleware';

import postRoutes from './routes/postRoutes';
import followRoutes from './routes/followRoutes';

const app = express();

app.use(cors())

app.use(express.json());

//routes
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/user/:id/follow', followRoutes)

app.use(errorHandler);

export default app;
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import errorHandler from './middleware/errorMiddleware';
import { authMiddleware } from './middleware/authMiddleware';

import postRoutes from './routes/postRoutes';
import followRoutes from './routes/followRoutes';
import likeRoutes from './routes/likeRoutes';
import commentRoutes from './routes/commentRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors())

app.use(express.json());

//routes
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/user/:id/follow',authMiddleware, followRoutes);
app.use('/api/v1/post/:postId/like',authMiddleware, likeRoutes);
app.use('/api/v1/post/:postId/comments',authMiddleware, commentRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
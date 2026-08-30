import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import errorHandler from './middleware/errorMiddleware';
import { authMiddleware } from './middleware/authMiddleware';
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet";

import postRoutes from './routes/postRoutes';
import followRoutes from './routes/followRoutes';
import likeRoutes from './routes/likeRoutes';
import commentRoutes from './routes/commentRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';
import searchRoutes from './routes/searchRoutes'
import dashboardRoutes from './routes/dashboardRoutes';
import placeRoutes from './routes/placeRoutes'


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 300, 
    standardHeaders: 'draft-8',
    legacyHeaders: false, 	ipv6Subnet: 56,
 })

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(helmet());app.use(cors())
app.use(limiter)
app.use(express.json());

//routes
app.use('/api/v1', dashboardRoutes)
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/user/:id/follow',authMiddleware, followRoutes);
app.use('/api/v1/trips', tripRoutes)
app.use('/api/v1/post/:postId/like',authMiddleware, likeRoutes);
app.use('/api/v1/post/:postId/comments',authMiddleware, commentRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/place', placeRoutes)

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
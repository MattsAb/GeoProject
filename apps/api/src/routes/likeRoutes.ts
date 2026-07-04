import { Router } from 'express';
import { getLikedPosts, likePost, unlikePost } from '../controllers/likeController';
import { validate } from '../middleware/validationMiddleware';
import { likeParamsSchema } from '../schemas/like.schema';

const router = Router({ mergeParams: true })

router.post(
    '/',
    validate(likeParamsSchema),
    likePost
);

router.delete(
    '/',
    validate(likeParamsSchema),
    unlikePost
);

router.get(
    '/',
    getLikedPosts
);

export default router
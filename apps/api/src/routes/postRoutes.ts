import { Router } from 'express'
import { createPost, deletePost, editPost, getFeed, getPost, getUserPosts } from '../controllers/postController'
import { authMiddleware, lightAuthMiddleware } from '../middleware/authMiddleware';
import { createUpload } from '../config/s3';
import { validate } from '../middleware/validationMiddleware';
import { createPostSchema, listPostsQuerySchema, postParamsSchema } from '../schemas/post.schema';

const router = Router()

router.get(
    '/',
    authMiddleware,
    validate(listPostsQuerySchema),
    getFeed
);

router.get(
    "/user",
    authMiddleware,
    getUserPosts
)

router.get(
    '/:postId',
    lightAuthMiddleware,
    validate(postParamsSchema),
    getPost
);

router.post(
    '/',
    authMiddleware,
    createUpload("posts").single('image'),
    validate(createPostSchema),
    createPost
);

router.put(
    '/:postId',
    authMiddleware,
    createUpload("posts").single('image'),
    validate(createPostSchema),
    editPost
);

router.delete(
    '/:id',
    authMiddleware,
    validate(postParamsSchema),
    deletePost
);
export default router
import { Router } from 'express';
import { createComment, deleteComment } from '../controllers/commentController';
import { validate } from '../middleware/validationMiddleware';
import { commentParamsSchema, createCommentSchema } from '../schemas/comment.schema';

const router = Router({ mergeParams: true })

router.post(
    '/',
    validate(createCommentSchema),
    createComment
);

router.delete(
    '/:commentId',
    validate(commentParamsSchema),
    deleteComment
);

export default router
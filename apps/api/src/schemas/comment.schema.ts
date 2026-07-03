import { z } from 'zod';

export const createCommentSchema = z.object({
  body: z.object({
    body: z.string().min(1).max(200),
  }),
  params: z.object({
    postId: z.uuid(),
  }),
});

export const commentParamsSchema = z.object({
  params: z.object({
    commentId: z.uuid(),
  }),
});

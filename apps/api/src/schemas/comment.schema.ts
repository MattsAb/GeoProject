import { z } from 'zod';

export const createCommentSchema = z.object({
  body: z.object({
    body: z.string()
    .min(1, {error: "must provide a comment body"})
    .max(150, {error: "comment must be less than 150 characters long"}),
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

import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    description: z.string().min(1, {error: "must provide a description"} ).max(150, {error: "description must be less than 150 characters"} ),
  }),
});

export const postParamsSchema = z.object({
  params: z.object({
    postId: z.uuid(),
  }),
});

export const listPostsQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
});
import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    description: z.string().min(1).max(500),
    countryCode: z
      .string()
      .regex(/^[A-Z]{2}$/, 'Must be a valid ISO 3166-1 alpha-2 code'),
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
    countryCode: z
      .string()
      .regex(/^[A-Z]{2}$/)
      .optional(),
  }),
});
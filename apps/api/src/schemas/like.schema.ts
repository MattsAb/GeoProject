import { z } from 'zod';

export const likeParamsSchema = z.object({
  params: z.object({
    postId: z.uuid(),
  }),
});
import { z } from 'zod';

export const followParamsSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});
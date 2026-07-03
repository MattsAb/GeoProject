import { z } from 'zod';

export const profileParamsSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});
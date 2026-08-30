import { z } from 'zod';

export const createTripSchema = z.object({
  body: z.object({
    title: z.string().min(5, {error: "title must be atleast 5 characters long"})
    .max(30, {error: "title must be less than 30 characters long"}),
  }),
});

export const tripParamsSchema = z.object({
  params: z.object({
    tripId: z.uuid(),
  }),
});
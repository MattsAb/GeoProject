import { z } from 'zod';
import {PostDTO} from "@geoapp/types";

export const postSchema = z.object({
  photoUrl: z.string().url(),
  description: z.string().min(1).max(500),
  countryCode: z.string().regex(/^[A-Z]{2}$/),
}) satisfies z.ZodType<PostDTO>;
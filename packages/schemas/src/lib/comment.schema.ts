import { z } from 'zod';
import {CommentDTO} from "@geoapp/types";

export const postSchema = z.object({
  body: z.string().min(1).max(200),

}) satisfies z.ZodType<CommentDTO>;
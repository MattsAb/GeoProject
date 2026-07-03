import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
    email: z.email(),
    username: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9_]+$/, 'Alphanumeric and underscores only'),
    password: z.string().min(8),
  }),
});

export const confirmSignUpSchema = z.object({
  body: z.object({
    email: z.email(),
    confirmationCode: z.string().length(6),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(1),
  }),
});
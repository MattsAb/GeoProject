import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
    email: z.email({error: "please provide an email"}),
    username: z
      .string()
      .min(5, {error: "username must be atleast 5 charcters long"})
      .max(30, {error: "username must be shorter than 30 chracaters long"})
      .regex(/^[a-zA-Z0-9_]+$/, {error: 'Alphanumeric and underscores only'}),
    password: z
    .string()
    .min(8, { error: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { error: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { error: 'Password must contain at least one special character' }),
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
    email: z.email({error: "please provide an email"}),
    password: z.string().min(8, {error: 'password must be atleast 8 characters long'}),
  }),
});

export const resendCodeSchema = z.object({
  body: z.object({
    email: z.email(),
  }),
});
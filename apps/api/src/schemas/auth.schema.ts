import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
    email: z.email({error: "please provide an email"}),
    username: z
      .string()
      .min(5, {error: "username must be atleast 5 charcters long"})
      .max(30, {error: "username must be shorter than 30 chracaters long"})
      .regex(/^[a-zA-Z0-9_]+$/, {error: 'Alphanumeric and underscores only'}),
    password: z.string().min(8 , {error: 'password must be atleast 8 characters long'}),
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
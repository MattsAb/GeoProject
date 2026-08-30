import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.url(),
  AWS_REGION: z.string().min(1),
  AWS_BUCKET_NAME: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  COGNITO_USER_POOL_ID: z.string().min(1),
  COGNITO_CLIENT_ID: z.string().min(1),
  GOOGLE_MAPS_API_KEY: z.string().min(1)
});

export const env = envSchema.parse(process.env);
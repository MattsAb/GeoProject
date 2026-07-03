// src/config/cognito.ts
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { env } from '../schemas/env';


export const cognito = new CognitoIdentityProviderClient({
  region: env.AWS_REGION,
});
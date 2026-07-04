import { Request, Response } from 'express';
import { SignUpCommand, ConfirmSignUpCommand, InitiateAuthCommand, ResendConfirmationCodeCommand, UserNotFoundException, InvalidParameterException } from '@aws-sdk/client-cognito-identity-provider';
import { prisma } from '../config/prisma'
import { cognito } from '../config/cognito';
import { ServerError } from '../middleware/errorMiddleware';
import { ConfirmSignUpDTO, LoginDTO, ResendCodeDTO, SignUpDTO } from '@geoapp/types';
import { env } from '../schemas/env';



export async function signUp(req: Request, res: Response) {
  
  const { email, username, password } = req.body as SignUpDTO;

  const command = new SignUpCommand({
    ClientId: env.COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [{ Name: 'email', Value: email }],
  });

  try {
    const data = await cognito.send(command);

        await prisma.user.create({
      data: {
        email,
        username,
        provider: 'cognito',
        providerId: data.UserSub!,
      },
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Cognito signUp error:', error);
    throw new ServerError(400, 'Error signing up');
  }
}

export async function confirmSignUp(req: Request, res: Response) {
  const { email, confirmationCode } = req.body as ConfirmSignUpDTO;

  const command = new ConfirmSignUpCommand({
    ClientId: env.COGNITO_CLIENT_ID,
    Username: email,
    ConfirmationCode: confirmationCode,
  });

  try {
    await cognito.send(command);
    res.status(200).json({ message: 'User confirmed successfully' });
  } catch (error) {
    console.error('Error confirming user:', error);
    throw new ServerError(400, 'Error confirming user');
  }
}


export async function login(req: Request, res: Response) {
  const { email, password } = req.body as LoginDTO;

  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  try {
    const data = await cognito.send(command);

    if (!data.AuthenticationResult) {
      throw new ServerError(400, 'Authentication failed');
    }

    const { AccessToken, IdToken, RefreshToken, ExpiresIn } = data.AuthenticationResult;

    res.status(200).json({
      accessToken: AccessToken,
      idToken: IdToken,
      refreshToken: RefreshToken,
      expiresIn: ExpiresIn,
    });
  } catch (error) {
    console.error('Login error:', error);
    throw new ServerError(401, 'Invalid email or password');
  }
}

export async function resendCode(req: Request, res: Response) {
  const { email } = req.body as ResendCodeDTO;

  const command = new ResendConfirmationCodeCommand({
    ClientId: env.COGNITO_CLIENT_ID,
    Username: email,
  });

  try {
    await cognito.send(command);
    return res.status(200).json({ message: 'Confirmation code resent successfully' });
  } catch (error) {
    if (error instanceof UserNotFoundException) {
      
      return res.status(200).json({ message: 'If an account exists, a code has been sent' });
    }
    if (error instanceof InvalidParameterException) {
      
      throw new ServerError(400, 'This account is already confirmed');
    }
    console.error('Error resending confirmation code:', error);
    throw new ServerError(400, 'Error resending confirmation code');
  }
}

export async function getMe(req: Request, res: Response) {
  if (!req.user) throw new ServerError(401, 'Unauthorized');
  res.status(200).json(req.user);
}
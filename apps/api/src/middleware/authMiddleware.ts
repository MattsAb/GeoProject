import { Request, Response, NextFunction } from 'express'
import { platform } from 'node:os';
import { ServerError } from './errorMiddleware';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { prisma } from '../config/prisma';



const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id",
  clientId: process.env.COGNITO_CLIENT_ID,
});

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        const payload = await verifier.verify(token, {
            tokenUse: 'id',
            clientId: process.env.COGNITO_CLIENT_ID,
        });

        const providerId = payload.sub as string;
        
        let user = await prisma.user.findUnique({
            where: { providerId: providerId },
        });

        if (!user) { throw new ServerError(404, "User not found");}

        req.user = user;
        next();
    } catch(err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }


import { Request, Response, NextFunction } from 'express'

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  
    //const payload = await verifier.verify(token);
    //req.user = { id: payload.sub, email: payload.email as string };
    next();
  }


import { Request, Response, NextFunction } from 'express';

export class ServerError extends Error {
  constructor(
    public statusCode: number,
    public override message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({success: false, message: err.message });
  }

  console.error(err);
  return res.status(500).json({success: false, message: 'Internal server error' });
};

export default errorHandler;
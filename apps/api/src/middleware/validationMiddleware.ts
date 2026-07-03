// middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
        }));


    return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: formattedErrors,
            });
        }
        next(error);
    }
  };
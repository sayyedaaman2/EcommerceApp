import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/utils/AppError';
import logger from '@/utils/logger';

// Express recognizes error middleware only if it has 4 parameters: (err, req, res, next)
// Even if unused, keep `next` in the signature or the global error handler will not run
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

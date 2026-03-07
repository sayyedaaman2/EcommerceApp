import { Request, Response } from 'express';
import { AppError } from '@/utils/AppError';

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  //   _next: NextFunction,
) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

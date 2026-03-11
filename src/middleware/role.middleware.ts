import { Response, NextFunction } from 'express';
import { AuthRequest } from '@/middleware/auth.middleware';
import { AppError } from '@/utils/AppError';

export const requireRole = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new AppError('Unauthorized', 401));
        }

        if (!roles.includes(req.user.role || '')) {
            return next(new AppError('Forbidden', 403));
        }

        next();
    };
};

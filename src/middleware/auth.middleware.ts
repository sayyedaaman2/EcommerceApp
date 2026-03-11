import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/jwt.util';
import { AppError } from '@/utils/AppError';
import logger from '@/utils/logger';

interface JwtPayload {
    id: number;
    email: string;
    role?: string;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Unauthorized', 401));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token) as JwtPayload;

        req.user = decoded;

        next();
    } catch (error) {
        logger.error(error);
        next(new AppError('Invalid or expired token', 401));
    }
};

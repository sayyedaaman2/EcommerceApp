import '@/config/env.config';
import jwt, { JwtPayload } from 'jsonwebtoken';

if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined');
}
if (!process.env.JWT_EXPIRES_IN) {
    throw new Error('JWT_EXPIRES_IN is not defined');
}
if (!process.env.JWT_SECRET_REFRESH_KEY) {
    throw new Error('JWT_SECRET_REFRESH_KEY is not defined');
}
if (!process.env.JWT_REFRESH_EXPIRES_IN) {
    throw new Error('JWT_REFRESH_EXPIRES_IN is not defined');
}

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

const REFRESH_SECRET_KEY = process.env.JWT_SECRET_REFRESH_KEY as string;
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN as string;

export interface TokenPayload {
    id: number;
    name: string;
    username: string;
    roleId: number
}

export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
};

export const verifyToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, SECRET_KEY) as JwtPayload;
    } catch {
        throw new Error("Invalid or expired access token");
    }
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
};

export const verifyRefreshToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, REFRESH_SECRET_KEY) as JwtPayload;
    } catch {
        throw new Error("Invalid or expired refresh token");
    }
};
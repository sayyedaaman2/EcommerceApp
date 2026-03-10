import '@/config/env.config'
import jwt, { JwtPayload } from 'jsonwebtoken';

if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined");
}
const SECRET_KEY = process.env.JWT_SECRET_KEY as string;


export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, SECRET_KEY);
};
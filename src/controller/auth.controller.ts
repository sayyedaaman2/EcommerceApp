import { NextFunction, Request, Response } from 'express';
import * as UserModel from '@/model/user.model';
import { Prisma } from '@prisma/client';
import { comparePassword, hashPassword } from '@/utils/password.util';
import { AppError } from '@/utils/AppError';
import { generateRefreshToken, generateToken, TokenPayload, verifyRefreshToken } from '@/utils/jwt.util';
import { AuthRequest } from '@/middleware/auth.middleware';

type RegisterPayload = Omit<Prisma.UserCreateInput, 'passwordHash' | 'role'> & {
    password: string;
    roleId: number;
};
type LoginPayload = Prisma.UserGetPayload<{
    select: {
        email: true;
        password: true;
    };
}>;

type SafeUser = Prisma.UserGetPayload<{
    omit: {
        passwordHash: true;
    };
}> & {
    accessToken?: string;
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const payload: RegisterPayload = req.body;

    // checking username and email is exists

    const emailExists = await UserModel.getUserByEmail(payload.email);

    if (emailExists) {
        return next(new AppError('email already exists', 400));
    }

    const userNameExists = await UserModel.getUserByUserName(payload.username);

    if (userNameExists) {
        return next(new AppError('username already exists', 400));
    }

    const hashedPassword = await hashPassword(payload.password);


    const userCreated = await UserModel.createUser({
        name: payload.name,
        email: payload.email,
        username: payload.username,
        passwordHash: hashedPassword,
        role: {
            connectOrCreate: {
                create: { name: "user", id: 2 },
                where: { id: 2 }
            },

        },
    });
    res.status(201).json({
        sucess: true,
        message: 'User created successfully',
        data: userCreated,
    });
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginPayload = req.body;

    const userExists = await UserModel.getUserWithPasswordByEmail(email);

    // same message to avoid email enumeration
    if (!userExists) {
        return next(new AppError('Invalid email or password', 401));
    }

    const isPasswordMatch = await comparePassword(password, userExists.passwordHash);

    if (!isPasswordMatch) {
        return next(new AppError('Invalid email or password', 401));
    }

    // remove password hash safely
    const { passwordHash: _passwordHash, ...user } = userExists;

    const tokenObject = {
        id: user.id,
        name: user.name,
        username: user.username,
        roleId: user.roleId,
    };

    const token = generateToken(tokenObject);
    const refreshToken = generateRefreshToken(tokenObject);

    await UserModel.updateUserById(user.id, { refreshToken })

    const safeUser: SafeUser = {
        ...user,
        accessToken : token
    };

    res.status(200).cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    }).json({
        success: true,
        message: 'Login successful',
        data: safeUser,
    });
};
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("refreshToken").json({
            message: "Logged out"
        });
    } catch (error) {
        next(error)
    }
};
export const userAuthentication = async (req: AuthRequest, res: Response, _next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'User Authenticated',
        data: req.user,
    });
};

export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return next(new AppError("No token provided", 400));
        }

        let payload: TokenPayload;

        try {
            payload = verifyRefreshToken(refreshToken) as TokenPayload;
        } catch {
            return next(new AppError("Invalid refresh token", 401));
        }

        const user = await UserModel.getUserById(payload.id);

        if (!user || user.refreshToken !== refreshToken) {
            return next(new AppError("Unauthorized", 401));
        }

        const newAccessToken = generateToken({
            id: user.id,
            name: user.name,
            roleId: user.roleId,
            username: user.username
        });

        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });

    } catch (error) {
        next(error);
    }
};
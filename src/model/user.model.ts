import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

const safeUserOmit: Prisma.UserOmit = {
    passwordHash: true,
};

export const createUser = async (data: Prisma.UserCreateInput) => {
    return prisma.user.create({ data, omit: safeUserOmit });
};

export const updateUserById = async (id: number, data: Prisma.UserUpdateInput) => {
    return prisma.user.update({
        where: { id },
        data,
        omit: safeUserOmit,
    });
};

export const getUsers = async () => {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' }, omit: safeUserOmit });
};

export const getUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
        omit: safeUserOmit,
    });
};

export const getUserWithPasswordByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
    });
};

export const getUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
        omit: safeUserOmit,
    });
};

export const getUserByUserName = async (username: string) => {
    return prisma.user.findUnique({
        where: { username },
        omit: safeUserOmit,
    });
};

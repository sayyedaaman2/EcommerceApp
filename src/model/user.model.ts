import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createUser = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
};

export const updateUserById = async (id: number, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const getUsers = async () => {
  return prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

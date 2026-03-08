import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createRole = async (data: Prisma.RoleCreateInput) => {
  return await prisma.role.create({ data });
};

export const updateRoleById = async (id: number, data: Prisma.RoleUpdateInput) => {
  return prisma.role.update({
    where: { id },
    data,
  });
};

export const getRoles = async () => {
  return prisma.role.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getRoleById = async (id: number) => {
  return prisma.role.findUnique({
    where: { id },
  });
};

export const getRoleByName = async (name: string) => {
  return prisma.role.findUnique({
    where: { name },
  });
};

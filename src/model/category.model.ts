import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createCateogry = async (data: Prisma.CategoryCreateInput) => {
  return await prisma.category.create({ data });
};

export const updateCateogryById = async (id: number, data: Prisma.CategoryUpdateInput) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const getCategories = async () => {
  return prisma.category.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getCateogryById = async (id: number) => {
  return prisma.category.findUnique({
    where: { id },
  });
};

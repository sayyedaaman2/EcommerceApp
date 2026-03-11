import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createProduct = async (data: Prisma.ProductCreateInput) => {
    return prisma.product.create({ data });
};

export const updateProductById = async (id: number, data: Prisma.ProductUpdateInput) => {
    return prisma.product.update({
        where: { id },
        data,
    });
};

export const getProducts = async () => {
    return prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getProductById = async (id: number) => {
    return prisma.product.findUnique({
        where: { id },
    });
};

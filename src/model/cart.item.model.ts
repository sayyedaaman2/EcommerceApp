import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createCartItem = async (data: Prisma.CartItemCreateInput) => {
    return prisma.cartItem.create({ data });
};

export const updateCartItemById = async (id: number, data: Prisma.CartItemUpdateInput) => {
    return prisma.cartItem.update({
        where: { id },
        data,
    });
};

export const getCartItems = async () => {
    return prisma.cartItem.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getCartItemById = async (id: number) => {
    return prisma.cartItem.findUnique({
        where: { id },
    });
};

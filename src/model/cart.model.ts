import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createCart = async (data: Prisma.CartCreateInput) => {
    return prisma.cart.create({ data });
};

export const updateCartById = async (id: number, data: Prisma.CartUpdateInput) => {
    return prisma.cart.update({
        where: { id },
        data,
    });
};

export const getCarts = async () => {
    return prisma.cart.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getCartById = async (id: number) => {
    return prisma.cart.findUnique({
        where: { id },
    });
};

export const getCartByUserId = async (id:number)=>{
    return prisma.cart.findFirst({
        where : {
            userId : id
        }
    })
}
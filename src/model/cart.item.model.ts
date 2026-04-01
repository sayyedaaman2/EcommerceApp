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

export const getCartItemByProductIdAndCartId = async(productId:number,cartId:number)=>{
    return prisma.cartItem.findFirst({
        where : {
            cartId,
            productId
        }
    })
}
export const deleteCartItemById = async(cartItemId : number)=>{
    return prisma.cartItem.delete({
        where : {id  : cartItemId}
    })
}

export const getCartItemsByCartId = async(cartId:number)=>{
    return prisma.cartItem.findMany({
        where : {cartId}
    })
}
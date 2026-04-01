import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createOrderItem = async (data: Prisma.OrderItemCreateInput) => {
    return prisma.orderItem.create({ data });
};

export const updateOrderItemById = async (id: number, data: Prisma.OrderItemUpdateInput) => {
    return prisma.orderItem.update({
        where: { id },
        data,
    });
};

export const getOrderItems = async () => {
    return prisma.orderItem.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getOrderItemById = async (id: number) => {
    return prisma.orderItem.findUnique({
        where: { id },
    });
};

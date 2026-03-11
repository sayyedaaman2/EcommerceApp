import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createOrder = async (data: Prisma.OrderCreateInput) => {
    return prisma.order.create({ data });
};

export const updateOrderById = async (id: number, data: Prisma.OrderUpdateInput) => {
    return prisma.order.update({
        where: { id },
        data,
    });
};

export const getOrders = async () => {
    return prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getOrderById = async (id: number) => {
    return prisma.order.findUnique({
        where: { id },
    });
};

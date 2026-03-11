import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createAddress = async (data: Prisma.AddressCreateInput) => {
    return await prisma.address.create({ data });
};

export const updateAddressById = async (id: number, data: Prisma.AddressUpdateInput) => {
    return prisma.address.update({
        where: { id },
        data,
    });
};

export const getAddresses = async () => {
    return prisma.address.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getAddressById = async (id: number) => {
    return prisma.address.findUnique({
        where: { id },
    });
};

import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createAddress = async (
    userId: number,
    data: {
        street: string;
        landmark?: string;
        city: string;
        state: string;
        country: string;
        pincode: string;
    }
) => {
    return prisma.address.create({
        data: {
            street: data.street,
            landmark: data.landmark,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,

            user: {
                connect: { id: userId }
            }
        }
    });
};

export const updateAddressById = async (
    id: number,
    userId: number,
    data: Prisma.AddressUpdateInput
) => {
    return prisma.address.updateMany({
        where: {
            id,
            userId
        },
        data
    });
};
export const deleteAddressById = async (
    id: number,
    userId: number
) => {
    return prisma.address.deleteMany({
        where: {
            id,
            userId
        }
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

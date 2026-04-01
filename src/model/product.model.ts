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
export const deleteProductById = async(id:number)=>{
    return prisma.product.delete({
        where : {id}
    })
}
export const getProducts = async (options: any) => {
  const { where, skip, limit, orderBy } = options;

  return prisma.product.findMany({
    where,
    skip,
    take: limit,
    orderBy,
  });
};

export const getProductsByIds = async(productIds:number[])=>{
    return prisma.product.findMany({
        where : {id : {in : productIds}}
    })
}

export const getProductById = async (id: number) => {
    return prisma.product.findUnique({
        where: { id },
    });
};
export const getProductByName = async (name:string) => {
    return prisma.product.findFirst({
        where: { name },
    });
};

export const getCount = async(options : {where? : {}})=>{
    return prisma.product.count(options);
}

export const addStock = async (productId: number, quantity: number) => {
    return prisma.product.update({
        where: { id: productId },
        data: {
            stock: {
                increment: quantity
            }
        }
    });
};

export const reduceStock = async (productId: number, quantity: number) => {
    return prisma.product.update({
        where: { id: productId },
        data: {
            stock: {
                decrement: quantity
            }
        }
    });
};
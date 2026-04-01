import { Prisma, Cart, CartItem, Product } from '@prisma/client';
import prisma from '@/lib/prisma';

export const createOrderFromCart = async (
    cart: Cart,
    cartItems: CartItem[],
    productMap: Map<number, Product>,
    shippingAddressId : number,
    billingAddressId : number | null,
    totalAmount: Prisma.Decimal
) => {
    return prisma.$transaction(async (tx) => {

        const newOrder = await tx.order.create({
            data: {
                userId: cart.userId,
                shippingAddressId: shippingAddressId, // REQUIRED
                billingAddressId: billingAddressId, // optional
                totalAmount,
            }
        });

        for (const item of cartItems) {
            const product = productMap.get(item.productId)!;

            // create order item
            await tx.orderItem.create({
                data: {
                    orderId: newOrder.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price
                }
            });

            // update stock
            await tx.product.update({
                where: {
                    id: item.productId,
                    stock: {
                        gte: item.quantity // 🔥 safety check
                    }
                },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            });
        }

        // clear cart
        await tx.cartItem.deleteMany({
            where: { cartId: cart.id }
        });

        return newOrder;
    });
};

export const updateOrderById = async (id: number, data: Prisma.OrderUpdateInput) => {
    return prisma.order.update({
        where: { id },
        data,
    });
};

export const updateStatusById = async(id:number,status:string)=>{
    return prisma.order.update({
        where : {id},
        data : {
            status : {set : status}
        }
    })
}

export const getOrders = async () => {
    return prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getOrderById = async (id: number) => {
    return prisma.order.findUnique({
        where: { id },
    });
};

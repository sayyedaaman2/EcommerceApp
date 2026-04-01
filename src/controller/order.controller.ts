import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client'
import * as Cart from '@/model/cart.model'
import * as CartItem from "@/model/cart.item.model"
import * as Order from '@/model/order.model';
import * as OrderItem from '@/model/order.item.model';
import * as Product from '@/model/product.model'
import * as Address from "@/model/address.model"
import { AppError } from '@/utils/AppError';


export const addOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cartId, shippingAddressId, billingAddressId = null } = req.body;

        const cart = await Cart.getCartById(cartId);

        if (!cart) {
            throw new AppError("Cart not found", 404);
        }

        const cartItems = await CartItem.getCartItemsByCartId(cart.id);

        if (!cartItems.length) {
            throw new AppError("Cart is empty", 400);
        }

        const shippingAddress = await Address.getAddressById(Number(shippingAddressId));
        if (!shippingAddress) {
            throw new AppError("Shipping Address not found", 404);
        }

        let billingAddress = null;
        if (billingAddressId) {
            billingAddress = await Address.getAddressById(Number(billingAddressId));
            if (!billingAddress) {
                throw new AppError("Billing Address not found", 404);
            }
        }

        // 🔥 batch fetch products
        const productIds = cartItems.map(item => item.productId);
        const products = await Product.getProductsByIds(productIds);
        const productMap = new Map(products.map(p => [p.id, p]));

        let totalAmount = new Prisma.Decimal(0);

        for (const item of cartItems) {
            const product = productMap.get(item.productId);

            if (!product) {
                throw new AppError("Product not found", 404);
            }

            if (product.stock < item.quantity) {
                throw new AppError("Insufficient stock", 400);
            }

            totalAmount = totalAmount.plus(
                product.price.mul(item.quantity)
            );
        }

        // 🔥 TRANSACTION START
        const order = await Order.createOrderFromCart(cart,cartItems,productMap,shippingAddressId, billingAddressId,totalAmount)

        res.status(201).json({
            message: "Order placed successfully",
            data: order
        });

    } catch (error) {
        next(error);
    }
};


export const updateStatus = async(req:Request,res:Response, next:NextFunction)=>{
    try{
        const orderId:number = Number(req.params.id);
        const {status} = req.body;
        const isOrderExists = await Order.getOrderById(orderId);

        if(!isOrderExists){
            return next(new AppError("Order not found", 404));
        }
        const cancelledOrder = await Order.updateStatusById(orderId, status)

        res.status(200).json({
            success : true,
            message : "Order cancelled",
            data : cancelledOrder
        })
    }catch(error){
        next(error)
    }
}
import { Request, Response, NextFunction } from 'express';
import * as Cart from '@/model/cart.model';
import * as CartItem from '@/model/cart.item.model';
import * as User from '@/model/user.model'
import { AppError } from '@/utils/AppError';
import { Prisma } from '@prisma/client'

interface AddCartPayload {
    productId: number,
    quantity: number,
}
export const addCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, quantity }: AddCartPayload = req.body;
        const userId = 11; // mock data;

        if (!productId || quantity <= 0) {
            throw new AppError("Invalid payload", 400);
        }

        let cart = await Cart.getCartByUserId(userId);

        if (!cart) {
            cart = await Cart.createCart({
                user: { connect: { id: userId } }
            });
        }

        const existingCartItem = await CartItem.getCartItemByProductIdAndCartId(
            productId,
            cart.id
        );

        let cartItem;

        if (existingCartItem) {
            cartItem = await CartItem.updateCartItemById(
                existingCartItem.id,
                {
                    quantity: existingCartItem.quantity + quantity
                }
            );
        } else {
            cartItem = await CartItem.createCartItem({
                cart: { connect: { id: cart.id } },
                product: { connect: { id: productId } },
                quantity
            });
        }

        res.status(200).json({
            message: "Item added to cart",
            data: cartItem
        });

    } catch (error) {
        next(error);
    }
};

interface UpdateCartPayload {
    action: "increment" | "decrement",
}
export const updateCartItemQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItemId = Number(req.params.id);
    const { action } = req.body;

    if (!["increment", "decrement"].includes(action)) {
      throw new AppError("Invalid action", 400);
    }

    const cartItem = await CartItem.getCartItemById(cartItemId);

    if (!cartItem) {
      throw new AppError("Cart item not found", 404);
    }

    let updatedItem = null;

    if (action === "increment") {
      updatedItem = await CartItem.updateCartItemById(cartItemId, {
        quantity: cartItem.quantity + 1
      });
    }

    if (action === "decrement") {
      if (cartItem.quantity === 1) {
        await CartItem.deleteCartItemById(cartItemId);

        return res.status(200).json({
          message: "Item removed from cart"
        });
      }

      updatedItem = await CartItem.updateCartItemById(cartItemId, {
        quantity: cartItem.quantity - 1
      });
    }

    res.status(200).json({
      message: "Cart updated",
      data: updatedItem
    });

  } catch (error) {
    next(error);
  }
};
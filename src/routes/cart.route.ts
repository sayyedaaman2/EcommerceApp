import {Router}  from 'express';
import * as Controller from '@/controller/cart.controller'
const router = Router();

// add to cart
router.post("/add", Controller.addCart )

// update the cart (increase and descrease the quantity)
router.patch("/item/:id", Controller.updateCartItemQuantity)

export default router;
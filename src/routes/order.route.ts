import {Router} from 'express';
import * as Controller from '@/controller/order.controller'

const router = Router();

// Place order

router.post("/place",Controller.addOrder)

// get orders 

// router.get("/");

// cancel order
router.patch("/update/:id", Controller.updateStatus)


export default router;
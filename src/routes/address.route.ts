import {Router} from 'express';
import * as Controller from '@/controller/addresss.controller'
const router = Router();

router.post("/add",Controller.addAddress)

router.put("/update",Controller.updateAddress)

router.delete("/delete/:id",Controller.deleteAddress)

export default router;

import {Router} from 'express';
import {asyncHandler} from '@/middleware/asyncHandler.middleware'
import * as Controller from '@/controller/product.controller'
const router = Router();

// add product
router.post('/', asyncHandler(Controller.postProduct))

// // update product
router.put("/:id",asyncHandler(Controller.updateProduct))

// delete product
router.patch("/:id",asyncHandler(Controller.deleteProduct))

//get product by Id
router.get("/:id", asyncHandler(Controller.findProductById));

//get all products
router.get("/", asyncHandler(Controller.findAllProducts));

export default router;
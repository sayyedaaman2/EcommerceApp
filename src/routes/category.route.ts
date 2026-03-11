import { Router } from 'express';
import * as Controller from '@/controller/category.controller';
import { asyncHandler } from '@/middleware/asyncHandler.middleware';

const router = Router();

// create category
router.post('/', asyncHandler(Controller.postCategory));

// // update category
router.put('/:id', asyncHandler(Controller.updateCategory));

// // get category with query
router.get('/', asyncHandler(Controller.getAllCategories));

// // get category by id
router.get('/:id', asyncHandler(Controller.getCategoryById));

export default router;

import { Router } from 'express';

import roleRoutes from './role.route';
import authRoutes from './auth.route';
import categoryRoutes from './category.route';
import productRoutes from './product.route'
const router = Router();
router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/category', categoryRoutes);
router.use("/product",productRoutes)
export default router;

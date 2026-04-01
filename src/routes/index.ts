import { Router } from 'express';

import roleRoutes from './role.route';
import authRoutes from './auth.route';
import categoryRoutes from './category.route';
import productRoutes from './product.route'
import cartRoutes from './cart.route'
import orderRoutes from './order.route'
import addressRoutes from './address.route';
const router = Router();
router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/category', categoryRoutes);
router.use("/product",productRoutes)
router.use("/cart",cartRoutes);
router.use("/order", orderRoutes);
router.use("/address", addressRoutes);
export default router;

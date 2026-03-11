import { Router } from 'express';

import roleRoutes from './role.route';
import authRoutes from './auth.route';
import categoryRoutes from './category.route';

const router = Router();
router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/category', categoryRoutes);
export default router;

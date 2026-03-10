import { Router } from 'express';

import roleRoutes from './role.route';
import authRoutes from './auth.route'
const router = Router();
router.use('/auth',authRoutes)
router.use('/roles', roleRoutes);
export default router;

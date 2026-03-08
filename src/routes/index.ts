import { Router } from 'express';

import roleRoutes from './role.route';

const router = Router();
router.use('/roles', roleRoutes);

export default router;

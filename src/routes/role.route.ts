import { Router } from 'express';
import * as Controller from '@/controller/role.controller';
import { asyncHandler } from '@/middleware/asyncHandler.middleware';
const router = Router();

router.post('/', asyncHandler(Controller.postRole));

router.put('/:id', asyncHandler(Controller.updateRoleById));

router.get('/', asyncHandler(Controller.getRoles));

router.get('/:id', asyncHandler(Controller.getRoleById));
export default router;

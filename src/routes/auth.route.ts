import { Router } from 'express';
import * as Controller from '@/controller/auth.controller';
import { asyncHandler } from '@/middleware/asyncHandler.middleware';
import { authMiddleware } from '@/middleware/auth.middleware';
const router = Router();

router.post('/register', asyncHandler(Controller.registerUser));
router.post('/login', asyncHandler(Controller.loginUser));

router.get('/token/verification', authMiddleware, asyncHandler(Controller.userAuthentication));
router.post("/refresh-token", asyncHandler(Controller.refreshToken));
router.post("/logout", asyncHandler(Controller.logout))

export default router;

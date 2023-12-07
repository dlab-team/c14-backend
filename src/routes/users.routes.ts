import { Router } from 'express';
import userController from '@/controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/login', userController.login);

export default router;

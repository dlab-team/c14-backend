import { Router } from 'express';
import usersRoutes from './users.routes';

const router = Router();

// modules
router.use('/users', usersRoutes);

export default router;

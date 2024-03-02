import { Router } from 'express';
import * as resultController from '@/controllers/result.controller';

const router = Router();
router.post('/', resultController.createResult);

export default router;

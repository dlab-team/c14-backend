import { Router } from 'express';
import * as resultController from '@/controllers/result.controller';
import validator from '@/middleware/validator';

const router = Router();
router.post('/', validator.validateResultCreate, resultController.createResult);

export default router;

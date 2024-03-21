import { Router } from 'express';
import * as resultController from '@/controllers/result.controller';
import validator from '@/middleware/validator';

const router = Router();
router.post('/opinion', validator.validateResultOpinion, resultController.createResultOpinion);
router.post(
  '/subjetive',
  validator.validateResultSubjetive,
  resultController.createResultSubjetive,
);

export default router;

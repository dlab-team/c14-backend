import { Router } from 'express';
import surveyResultController from '@/controllers/survey_result.controller';
const router = Router();

router.post('/', surveyResultController.createResult);

export default router;

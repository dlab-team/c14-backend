import { Router } from 'express';
import surveyResponseController from '@/controllers/survey_response.controller';
const router = Router();

router.post('/', surveyResponseController.createResponse);

export default router;

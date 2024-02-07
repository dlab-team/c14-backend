import { Router } from 'express';
import surveyResponseController from '@/controllers/survey_response.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';
const router = Router();

router.post('/', surveyResponseController.createResponse);
router.get('/metrics', isAuthenticated, surveyResponseController.getMetrics);

export default router;

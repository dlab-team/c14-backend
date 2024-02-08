import { Router } from 'express';
import surveyResponseController from '@/controllers/survey_response.controller';
const router = Router();

router.post('/', surveyResponseController.createResponse);
router.get('/groupby/:polynomialId', surveyResponseController.getGroupedPolynomialOptions);

export default router;

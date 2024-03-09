import { Router } from 'express';
import surveyResponseController from '@/controllers/survey_response.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';
import validate from '@/middleware/validator';
const router = Router();

router.post('/', surveyResponseController.createResponse);
router.put('/', validate.resultProfile, surveyResponseController.finishResponse);
router.get('/metrics', isAuthenticated, surveyResponseController.getMetrics);
router.get('/groupby/:polynomialId', surveyResponseController.getGroupedPolynomialOptions);
router.get('/groupedbyyear', isAuthenticated, surveyResponseController.getGroupedResponsesByYear);
router.get(
  '/groupedbymonth/:year',
  isAuthenticated,
  surveyResponseController.getGroupedResponseForAYear,
);

export default router;

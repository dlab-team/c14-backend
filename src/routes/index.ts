import { Router } from 'express';
import usersRoutes from './users.routes';
import polynomialsRoutes from './polynomial.routes';
import polynomialsOptionsRoutes from './polynomial_option.routes';
import phrasesRoutes from './phrases.routes';
import surveyResponseRoutes from './survey_response.routes';
import feedbackRoutes from './feedback.routes';
import resultsRoutes from './results.routes';
import { errorHandler } from '@/errors';

const router = Router();

// modules
router.use('/users', usersRoutes);
router.use('/polynomials', polynomialsRoutes);
router.use('/polynomialsoptions', polynomialsOptionsRoutes);
router.use('/phrases', phrasesRoutes);
router.use('/surveyresponse', surveyResponseRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/results', resultsRoutes);
/**
 * Manejador de errores
 * Los errores en la parte de servicios no se deben manejar, todos se deben manejar en la
 * parte de los controladores para que el manejador pueda canturar los errores de la parte
 * de sequelize haciendo next(error)
 */
router.use(errorHandler);

export default router;

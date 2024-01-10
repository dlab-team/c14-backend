import { Router } from 'express';
import validate from '@/middleware/validator';
import polynomialController from '@/controllers/polynomial.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';
const router = Router();

router.get('/notpolitical', polynomialController.getAllPolynomialsNotPolitical);
router.delete('/:id', isAuthenticated, polynomialController.deletePolynomial);
router.get('/:id', polynomialController.getPolynomialsId);
router.put(
  '/:id',
  isAuthenticated,
  validate.validatePolynomialUpdate,
  polynomialController.putPolynomial,
);

router.post(
  '/',
  isAuthenticated,
  validate.validatePolynomialCreate,
  polynomialController.createPolynomial,
);
router.get('/', polynomialController.getAllPolynomials);

export default router;

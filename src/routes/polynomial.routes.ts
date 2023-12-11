import { Router } from 'express';
import Middlewares from '@/middlewares';
import polynomialController from '@/controllers/polynomial.controller';
const router = Router();

router.delete('/:id', Middlewares.validateResult, polynomialController.deletePolynomial);
router.get('/:id', Middlewares.validateResult, polynomialController.getPolynomialsId);

router.post('/', Middlewares.validateResult, polynomialController.createPolynomial);
router.put('/', Middlewares.validateResult, polynomialController.putPolynomial);
router.get('/', polynomialController.getAllPolynomials);

export default router;

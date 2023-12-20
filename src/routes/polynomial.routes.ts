import { Router } from 'express';
import * as Middlewares from '@/middleware';
import polynomialController from '@/controllers/polynomial.controller';
const router = Router();

router.delete('/:id', Middlewares.validateResult, polynomialController.deletePolynomial);
router.get('/:id', Middlewares.validateResult, polynomialController.getPolynomialsId);
router.put('/:id', Middlewares.validateResult, polynomialController.putPolynomial);

router.post('/', Middlewares.validateResult, polynomialController.createPolynomial);
router.get('/', polynomialController.getAllPolynomials);

export default router;

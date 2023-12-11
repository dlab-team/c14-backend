import { Router } from 'express';
import Middlewares from '@/middlewares';
import polynomialController from '@/controllers/polynomial.controller';
const router = Router();

router
  .route('/')
  .post(Middlewares.validateResult, polynomialController.createPolynomial)
  .put(Middlewares.validateResult, polynomialController.putPolynomial)
  .get(polynomialController.getAllPolynomials);

router
  .route('/:id')
  .delete(Middlewares.validateResult, polynomialController.deletePolynomial)
  .get(Middlewares.validateResult, polynomialController.getPolynomialsId);

export default router;

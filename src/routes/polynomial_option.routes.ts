import { Router } from 'express';
import * as Middlewares from '@/middleware';
import polynomialOptionController from '@/controllers/polynomial_option.controller';
const router = Router();

router.get('/', polynomialOptionController.getAllPolynomialsOption);
router.get('/:id', Middlewares.validateResult, polynomialOptionController.getPolynomialsOptionId);
router.put('/:id', Middlewares.validateResult, polynomialOptionController.putPolynomialOption);
router.post('/', Middlewares.validateResult, polynomialOptionController.createPolynomialOption);
router.delete(
  '/:id',
  Middlewares.validateResult,
  polynomialOptionController.deletePolynomialOption,
);

export default router;

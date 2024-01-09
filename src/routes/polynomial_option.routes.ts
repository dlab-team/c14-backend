import { Router } from 'express';
import polynomialOptionController from '@/controllers/polynomial_option.controller';
import { isAuthenticated } from '@/middleware';
const router = Router();

router.get('/', polynomialOptionController.getAllPolynomialsOption);
router.get('/:id', polynomialOptionController.getPolynomialsOptionId);
router.put('/:id', isAuthenticated, polynomialOptionController.putPolynomialOption);
router.post('/', isAuthenticated, polynomialOptionController.createPolynomialOption);
router.delete('/:id', isAuthenticated, polynomialOptionController.deletePolynomialOption);

export default router;

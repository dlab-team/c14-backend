import { Router } from 'express';
import polynomialOptionController from '@/controllers/polynomial_option.controller';
const router = Router();

router.get('/', polynomialOptionController.getAllPolynomialsOption);
router.get('/political', polynomialOptionController.getPoliticalPolyOption);
router.get('/:id', polynomialOptionController.getPolynomialsOptionId);
router.put('/:id', polynomialOptionController.putPolynomialOption);
router.post('/', polynomialOptionController.createPolynomialOption);
router.delete('/:id', polynomialOptionController.deletePolynomialOption);

export default router;

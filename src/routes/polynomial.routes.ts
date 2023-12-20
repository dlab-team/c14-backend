import { Router } from 'express';
import validate from '@/middleware/validator';
import polynomialController from '@/controllers/polynomial.controller';
const router = Router();

router.delete('/:id', polynomialController.deletePolynomial);
router.get('/:id', polynomialController.getPolynomialsId);

router.post('/', validate.validatePolynomialCreate, polynomialController.createPolynomial);
router.put('/', validate.validatePolynomialUpdate, polynomialController.putPolynomial);
router.get('/', polynomialController.getAllPolynomials);

export default router;

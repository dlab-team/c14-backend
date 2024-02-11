import { body } from 'express-validator';
import { validateResult } from '../validatorFuntion';

export const resultProfile = [
  body('id')
    .isString()
    .withMessage('Tiene que se un string')
    .notEmpty()
    .withMessage('No puede esta vacio el campo')
    .isUUID()
    .withMessage('Tiene que se un uuid')
    .escape(),
  body('polinomialOptionsId').isArray({ min: 1 }),
  validateResult,
];

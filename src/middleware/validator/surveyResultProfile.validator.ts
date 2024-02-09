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
  body('polinomialOptionsId').custom(idOptions => {
    idOptions.foreach((value: string) => {
      if (typeof value !== 'string') {
        throw new Error('Tiene que ser un string');
      }
    });
  }),
  validateResult,
];

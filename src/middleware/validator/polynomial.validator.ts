import { body } from 'express-validator';
import { validateResult } from '../validatorFuntion';

export const validatePolynomialCreate = [
  body('name')
    .isString()
    .withMessage('Tiene que se un string')
    .notEmpty()
    .withMessage('No puede esta vacio el campo')
    .escape(),
  body('question')
    .isString()
    .withMessage('Tiene que se un string')
    .notEmpty()
    .withMessage('No puede esta vacio el campo')
    .escape(),
  body('active')
    .isBoolean({ strict: true })
    .withMessage('Debe ser un booleano este campo')
    .toBoolean(),
  validateResult,
];

export const validatePolynomialUpdate = [
  body('active')
    .optional()
    .isBoolean({ strict: true })
    .withMessage('Este campo es booleano')
    .toBoolean(),
  body('name')
    .optional()
    .isString()
    .withMessage('Tiene que se un string')
    .notEmpty()
    .withMessage('No puede estar vacio')
    .escape(),
  validateResult,
];

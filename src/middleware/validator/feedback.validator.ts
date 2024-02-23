import { body } from 'express-validator';
import { validateResult } from '../validatorFuntion';

export const validateFeedback = [
    body('feedback')
        .isString()
        .withMessage('Tiene que ser un string')
        .notEmpty()
        .withMessage('No puede estar vacio')
        .escape(),
    body('rating')
        .isNumeric()
        .withMessage('Tiene que ser un numero')
        .notEmpty()
        .withMessage('No puede estar vacio')
        .escape(),
    validateResult,
];
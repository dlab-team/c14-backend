import { responses } from '@/enums';
import { body } from 'express-validator';
import { validateResult } from '../validatorFuntion';

export const validateResultCreate = [
  body(['surveyResponseId', 'phraseId'])
    .isString()
    .withMessage('Tiene que se un string')
    .notEmpty()
    .withMessage('No puede esta vacio el campo')
    .isUUID()
    .withMessage('Tiene que ser string UUID')
    .escape(),
  body('value').custom(value => {
    if (isNaN(value) && responses.includes(value)) {
      return true;
    }
    if (typeof value === 'number' && 0 < value && 100 >= value) {
      return true;
    }
    throw new Error('Tiene que ser un string o number entre 0 y 100 sin decimales');
  }),
  validateResult,
];

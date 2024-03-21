import { responses } from '@/enums';
import { body } from 'express-validator';
import { validateResult } from '../validatorFuntion';

export const validateResultOpinion = [
  body(['surveyResponseId', 'phraseId'])
    .isString()
    .withMessage('Tiene que se un string')
    .notEmpty()
    .withMessage('No puede esta vacio el campo')
    .isUUID()
    .withMessage('Tiene que ser string UUID')
    .escape(),
  body('value').custom(value => {
    if (isNaN(value) && typeof value === 'string' && responses.slice(-4).includes(value)) {
      return true;
    }
    throw new Error(
      'Tiene que ser un string que tenga uno de estos valores: ' + responses.slice(-4).join(', '),
    );
  }),
  validateResult,
];

export const validateResultSubjetive = [
  body(['surveyResponseId', 'phraseId'])
    .isString()
    .withMessage('Tiene que se un string')
    .notEmpty()
    .withMessage('No puede esta vacio el campo')
    .isUUID()
    .withMessage('Tiene que ser string UUID')
    .escape(),
  body('value').custom(value => {
    if (typeof value === 'number' && 0 <= value && 100 >= value) {
      return true;
    }
    throw new Error('Tiene que ser un numero entre 0 y 100 sin decimales');
  }),
  validateResult,
];

import { body } from 'express-validator';
import { validateResult } from '../validatorFuntion';
import { ClientError } from '@/errors';
import { SurveyResponseCharacter } from '@/types';
import { ResultOpinionCreate } from '@/db/models/resultOpinion';
import { SubjectiveResultCreate } from '@/db/models/subjectiveResult';
import { responses } from '@/enums';

const validateUUID = (uuid: string) => {
  if (typeof uuid !== 'string' || uuid.length !== 36) {
    throw new ClientError('el id tiene que ser un string de 36 caracteres', 400);
  }
};

export const resultProfile = [
  body('character')
    .exists()
    .withMessage('Character no puede estar vacío')
    .custom((character: SurveyResponseCharacter) => {
      validateUUID(character.id);
      character.polinomialOptionsId.forEach(validateUUID);
      if (typeof character.finishedSocialForm !== 'boolean') {
        throw new ClientError('finishedSocialForm tiene que ser un booleano', 400);
      }
      return true;
    }),

  body('responseOpinion')
    .exists()
    .withMessage('responseOpinion no puede estar vacío')
    .isArray({ min: 1 })
    .withMessage('responseOpinion debe ser un array con al menos un elemento')
    .custom((opinions: ResultOpinionCreate[]) => {
      opinions.forEach(opinion => {
        validateUUID(opinion.phraseId);
        validateUUID(opinion.surveyResponseId);
        if (typeof opinion.value !== 'string' || !responses.slice(-4).includes(opinion.value)) {
          throw new ClientError(
            'El valor de value debe estar entre ' + responses.slice(-4).join(', '),
            400,
          );
        }
      });
      return true;
    }),

  body('responseSubjetive')
    .exists()
    .withMessage('responseSubjetive no puede estar vacío')
    .isArray({ min: 1 })
    .withMessage('responseSubjetive debe ser un array con al menos un elemento')
    .custom((subjetives: SubjectiveResultCreate[]) => {
      subjetives.forEach((subjetive: SubjectiveResultCreate) => {
        validateUUID(subjetive.phraseId);
        validateUUID(subjetive.surveyResponseId);
        if (
          typeof subjetive.value !== 'number' ||
          isNaN(subjetive.value) ||
          subjetive.value < 0 ||
          subjetive.value > 100
        ) {
          throw new ClientError('El valor debe ser un número entre 0 y 100', 400);
        }
      });
      return true;
    }),

  validateResult,
];

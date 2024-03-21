import { Phrases, PhrasesAttributes, PhrasesCreationAttributes } from '@/db/models/phrases';
import { ClientError } from '@/errors';
import { Response } from './user.service';
import { IdPhrases, PhrasesUpdateService } from '@/types';
import polynomialService from '../services/polynomial.service';
import { sequelize } from '../db/models';
import polynomialOptionService from './polynomial_option.service';
import surveyResultService from './survey_result.service';
import { SurveyResultAttributes } from '../db/models/survey_result';
import { SurveyResult } from '../db/models/survey_result';
import { PolynomialOption } from '@/db/models/polynomial_option';
import { Literal } from 'sequelize/types/utils';

const literalPolynomialOptions: [Literal, string] = [
  sequelize.literal(`(
    SELECT STRING_AGG(name, ', ')
    FROM polynomial_option
    WHERE
      polynomial_option.group::text = phrases.group::text
    AND
      polynomial_option."polynomialId" = phrases."polynomialId"
      LIMIT 1
    )`),
  'options',
];

const createPhrasesDB = async (phrases: PhrasesCreationAttributes): Promise<PhrasesAttributes> => {
  const phrase = await Phrases.create(phrases, { raw: true });
  const polynomialOptions = await polynomialOptionService.getPolyOptionsFromPolyId(
    phrase.polynomialId,
  );
  const data: SurveyResultAttributes[] = [];
  polynomialOptions.forEach(option => {
    data.push({
      polynomialOptionId: option.id,
      phraseId: phrase.id,
      percentage: 0,
    });
  });
  surveyResultService.createResults(data);
  const phraseAtt = {
    id: phrase.id,
    text: phrase.text,
    group: phrase.group,
    polynomialId: phrase.polynomialId,
    neutral: phrase.neutral,
  };
  return phraseAtt;
};

const updatePhrasesDB = async (
  { survey_results: surveyResults, ...phrasesUpdate }: PhrasesUpdateService,
  id: string,
): Promise<PhrasesAttributes> => {
  const phrase = await getPhrasesId({ id });
  if (phrase) {
    phrase.update({
      text: phrasesUpdate.text ?? phrase.text,
      group: phrasesUpdate.group ?? phrase.group,
      neutral: phrasesUpdate.neutral ?? phrase.neutral,
    });
    await surveyResultService.updateResults(surveyResults);
    return phrase.dataValues;
  } else {
    throw new ClientError('La frase a actualizar no existe', 404);
  }
};

const deletePhrasesDB = async (idPhrases: IdPhrases): Promise<Response> => {
  const phrase = await getPhrasesId(idPhrases);
  if (phrase) {
    phrase.destroy();
    return { success: true, message: 'Se elimino la frase correctamente' };
  } else {
    throw new ClientError('La frase que intenta eliminar no existe', 404);
  }
};

const getPhrases = () => {
  return Phrases.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
};

const getPhrasesId = (idPhrases: IdPhrases) => {
  return Phrases.findByPk(idPhrases.id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
};

const getPolynomialPhrases = async (polynomialId: string): Promise<PhrasesAttributes[]> => {
  return Phrases.findAll({
    where: { polynomialId: polynomialId },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
      include: [literalPolynomialOptions],
    },
    include: [
      {
        model: SurveyResult,
        include: [
          {
            model: PolynomialOption,
            attributes: ['name'],
          },
        ],
      },
    ],
    order: [
      ['createdAt', 'DESC'],
      ['id', 'ASC'],
      [SurveyResult, PolynomialOption, 'name', 'ASC'],
    ],
  });
};

const getExtrmPoliticalPhrases = async (group: string): Promise<PhrasesAttributes[] | void> => {
  const politicalPolyId = await polynomialService.getPoliticalPolyId();
  if (politicalPolyId) {
    const phrases = await Phrases.findAll({
      where: {
        group: group,
        polynomialId: politicalPolyId.id, //ID del polinomio politico
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: 9,
      order: sequelize.random(),
    });
    return phrases;
  }
  return;
};

const getAllPoliticalPhrases = async (): Promise<PhrasesAttributes[] | void> => {
  const politicalPolyId = await polynomialService.getPoliticalPolyId();
  if (politicalPolyId) {
    const phrases = await Phrases.findAll({
      where: {
        polynomialId: politicalPolyId.id,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [
        ['createdAt', 'DESC'],
        ['id', 'ASC'],
      ],
    });
    return phrases;
  }
  return;
};

const allNeutralPhares = async () => {
  const politicalPolyId = await polynomialService.getPoliticalPolyId();
  const polarizedPhrases = await Phrases.findAll({
    where: {
      neutral: true,
      polynomialId: politicalPolyId?.id,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  const noPolarizedPhrases = await Phrases.findAll({
    where: {
      neutral: false,
      polynomialId: politicalPolyId?.id,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return { polarizadas: polarizedPhrases, noPolarizadas: noPolarizedPhrases };
};

const updatePolarized = async (idPhrases: string) => {
  const updatePhrase = await Phrases.findByPk(idPhrases);
  if (!updatePhrase) {
    throw new ClientError('No se encuentra el id suministrado', 400);
  }
  await updatePhrase.update({ neutral: !updatePhrase.neutral });
  const { id, polynomialId, text, neutral, group } = updatePhrase.dataValues;
  return { id, polynomialId, text, neutral, group };
};

export default {
  createPhrasesDB,
  updatePhrasesDB,
  deletePhrasesDB,
  getPhrases,
  getPhrasesId,
  getPolynomialPhrases,
  getExtrmPoliticalPhrases,
  getAllPoliticalPhrases,
  allNeutralPhares,
  updatePolarized,
};

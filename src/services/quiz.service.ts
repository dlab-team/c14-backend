import { Op } from 'sequelize';
import { Literal } from 'sequelize/types/utils';
import { sequelize } from '../db/models';
import { Phrases, PhrasesInstance } from '@/db/models/phrases';
import polynomialService from '../services/polynomial.service';
import polynomialOptionService from './polynomial_option.service';
import { SurveyResult } from '../db/models/survey_result';
import { Polynomial } from '@/db/models/polynomial';

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
  'name',
];

const getPoliticalPhrases = async (id: string): Promise<object[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);
  if (!polynomialOption) {
    throw new Error('No se encontro la opcion del polinomio.');
  }
  if (polynomialOption.dataValues.group === null) {
    return getCombinedNeutralPoliticalPhrases(polynomialOption.id);
  } else {
    const phrases = await Phrases.findAll({
      where: {
        group: polynomialOption.dataValues.group,
        polynomialId: polynomialOption.polynomialId,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
        include: [literalPolynomialOptions],
      },
      limit: 9,
      order: sequelize.random(),
      include: [
        {
          model: SurveyResult,
          where: {
            polynomialOptionId: polynomialOption.dataValues.id,
          },
          attributes: ['percentage'],
        },
      ],
    });

    return phrases;
  }
};

const getSocialPhrases = async (ids: Array<string>): Promise<PhrasesInstance[]> => {
  const allPhrases: PhrasesInstance[] = [];
  for (const option of ids) {
    const polynomialOption = await polynomialOptionService.getPolynomialOptionId(option);
    if (!polynomialOption) {
      throw new Error('No se encontro el id de una de las opciones de un polinomio.');
    }

    if (polynomialOption.dataValues.group !== null) {
      const phrases = await Phrases.findAll({
        where: {
          polynomialId: polynomialOption.dataValues.polynomialId,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'], include: [literalPolynomialOptions] },
        include: [
          {
            model: Polynomial,
            attributes: ['name'],
          },
          {
            model: SurveyResult,
            where: {
              polynomialOptionId: polynomialOption.dataValues.id,
            },
            attributes: ['percentage'],
          },
        ],
      });

      allPhrases.push(...phrases);
    }
  }
  const phrases = allPhrases.sort(() => Math.random() - 0.5);
  return phrases;
};

const getInverseSocialPhrases = async (ids: Array<string>): Promise<object[] | void> => {
  const allPhrases: Array<object> = [];

  for (const option of ids) {
    const polynomialOption = await polynomialOptionService.getPolynomialOptionId(option);

    if (!polynomialOption) {
      throw new Error('No se encontro el id de una de las opciones de un polinomio.');
    }

    const targetGroup = polynomialOption.dataValues.group;

    if (targetGroup !== null) {
      const inversePolyOptionId = await polynomialOptionService.getInversePolyOptionId([
        polynomialOption.id,
      ]);
      const phrases = await Phrases.findAll({
        where: {
          group: {
            [Op.ne]: targetGroup,
          },
          polynomialId: polynomialOption.dataValues.polynomialId,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'], include: [literalPolynomialOptions] },
        include: [
          {
            model: Polynomial,
            attributes: ['name'],
          },
          {
            model: SurveyResult,
            where: {
              polynomialOptionId: inversePolyOptionId,
            },
            attributes: ['percentage'],
          },
        ],
      });
      allPhrases.push(...phrases);
    }
  }

  // const socialPhrases = allPhrases.sort(() => Math.random() - 0.5);
  return allPhrases;
};

const getInversePoliticalPhrases = async (id: string): Promise<object[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);

  if (!polynomialOption) {
    throw new Error('No se encontró el id de la opción del polinomio.');
  }

  const { group } = polynomialOption.dataValues;

  if (group === null) {
    return getCombinedNeutralPoliticalInverse(id);
  }

  const inversePolyOptionId = await polynomialOptionService.getInversePolyOptionId([
    polynomialOption.id,
  ]);

  const phrases = await Phrases.findAll({
    where: {
      group: {
        [Op.ne]: group,
      },
      polynomialId: polynomialOption.polynomialId,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'], include: [literalPolynomialOptions] },
    limit: 9,
    order: sequelize.random(),
    include: [
      {
        model: SurveyResult,
        where: {
          polynomialOptionId: inversePolyOptionId,
        },
        attributes: ['percentage'],
      },
    ],
  });
  return phrases;
};

const getCombinedNeutralPoliticalPhrases = async (id: string): Promise<object[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);
  if (!polynomialOption) {
    throw new Error('No se encontró el id de la opción del polinomio.');
  }
  if (polynomialOption.group !== null) {
    throw new Error('Se debe ingresar una opción de polinomio neutra.');
  }
  const politicalPolyId = await polynomialService.getPoliticalPolyId();

  if (!politicalPolyId) {
    throw new Error('No se encontró el id del polinomio político.');
  }

  const phrasesPolarized = await Phrases.findAll({
    where: {
      polynomialId: politicalPolyId.id,
      neutral: true,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'], include: [literalPolynomialOptions] },
    // order: sequelize.random(),
    include: [
      {
        model: SurveyResult,
        where: {
          polynomialOptionId: polynomialOption.dataValues.id,
        },
        attributes: ['percentage'],
      },
    ],
  });

  if (!phrasesPolarized) {
    throw new Error('No se encontraron frases politicas.');
  }
  const phrases = phrasesPolarized.sort(() => Math.random() - 0.5);
  return phrases;
};

const getCombinedNeutralPoliticalInverse = async (id: string): Promise<object[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);
  if (!polynomialOption) {
    throw new Error('No se encontró el id de la opción del polinomio.');
  }
  if (polynomialOption.group !== null) {
    throw new Error('Se debe ingresar una opción de polinomio neutra.');
  }

  const phrasesNoPolarized = await Phrases.findAll({
    where: {
      polynomialId: polynomialOption.polynomialId,
      neutral: false,
    },
    attributes: {
      exclude: ['neutral', 'createdAt', 'updatedAt'],
      include: [literalPolynomialOptions],
    },
    include: [
      {
        model: SurveyResult,
        where: {
          polynomialOptionId: polynomialOption.dataValues.id,
        },
        attributes: ['percentage'],
      },
    ],
  });

  if (!phrasesNoPolarized) {
    throw new Error('No se encontraron frases politicas.');
  }

  const phrases = phrasesNoPolarized.sort(() => Math.random() - 0.5);
  return phrases;
};

export default {
  getCombinedNeutralPoliticalPhrases,
  getPoliticalPhrases,
  getInversePoliticalPhrases,
  getSocialPhrases,
  getInverseSocialPhrases,
  getCombinedNeutralPoliticalInverse,
};

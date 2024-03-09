import { Phrases } from '@/db/models/phrases';
import polynomialService from '../services/polynomial.service';
import { sequelize } from '../db/models';
import polynomialOptionService from './polynomial_option.service';
import { PhrasesInstance } from '@/db/models/phrases';
import { group } from '@/enums';
import { SurveyResult } from '../db/models/survey_result';
import { Polynomial } from '@/db/models/polynomial';
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

const getPoliticalPhrases = async (id: string): Promise<object[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);
  const allPhrases: Array<object> = [];
  if (polynomialOption) {
    if (polynomialOption.dataValues.group === null) {
      return getCombinedNeutralPoliticalPhrases(polynomialOption.id);
    } else {
      const politicalPolyId = await polynomialService.getPoliticalPolyId();
      if (politicalPolyId) {
        const phrases = await Phrases.findAll({
          where: {
            group: polynomialOption.dataValues.group,
            polynomialId: politicalPolyId.id,
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
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
        phrases.forEach((phrase: PhrasesInstance) => {
          const phrasesWithName = {
            ...phrase.dataValues,
            name: polynomialOption.dataValues.name,
          };
          allPhrases.push(phrasesWithName);
        });
        return allPhrases;
      } else {
        throw new Error('No se encontro el id del polinomio politico.');
      }
    }
  } else {
    throw new Error('No se encontro el id de la opcion del polinomio.');
  }
};

const getSocialPhrases = async (ids: Array<string>): Promise<object[] | void> => {
  const allPhrases: Array<object> = [];
  for (const option of ids) {
    const polynomialOption = await polynomialOptionService.getPolynomialOptionId(option);
    if (polynomialOption) {
      const polynomialName = await Polynomial.findOne({
        where: {
          id: polynomialOption.dataValues.polynomialId,
        },
        attributes: ['name'],
      });

      if (polynomialOption.dataValues.group !== null) {
        const phrases = await Phrases.findAll({
          where: {
            polynomialId: polynomialOption.dataValues.polynomialId,
          },
          attributes: { exclude: ['createdAt', 'updatedAt'], include: [literalPolynomialOptions] },
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
        phrases.forEach((phrase: PhrasesInstance) => {
          const phrasesWithName = {
            ...phrase.dataValues,
            name: polynomialName?.name,
          };
          allPhrases.push(phrasesWithName);
        });
      }
    } else {
      throw new Error('No se encontro el id de una de las opciones de un polinomio.');
    }
  }
  const socialPhrases = allPhrases.sort(() => Math.random() - 0.5);
  return socialPhrases;
};

const getInverseSocialPhrases = async (ids: Array<string>): Promise<object[] | void> => {
  const allPhrases: Array<object> = [];

  for (const option of ids) {
    const polynomialOption = await polynomialOptionService.getPolynomialOptionId(option);

    if (!polynomialOption) {
      throw new Error('No se encontro el id de una de las opciones de un polinomio.');
    }

    const polynomialName = await Polynomial.findOne({
      where: {
        id: polynomialOption.dataValues.polynomialId,
      },
      attributes: ['name'],
    });

    let targetGroup =
      polynomialOption.dataValues.group === null
        ? group[Math.floor(Math.random() * 2)]
        : polynomialOption.dataValues.group;
    if (targetGroup === 'Extremo 1') {
      targetGroup = 'Extremo 2';
    } else if (targetGroup === 'Extremo 2') {
      targetGroup = 'Extremo 1';
    }

    const Array: string[] = [polynomialOption.id];

    const inversePolyOptionId = await polynomialOptionService.getInversePolyOptionId(Array);

    let phrases;
    if (polynomialOption.dataValues.group !== null) {
      phrases = await Phrases.findAll({
        where: {
          group: targetGroup,
          polynomialId: polynomialOption.dataValues.polynomialId,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'], include: [literalPolynomialOptions] },
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
    }

    phrases?.forEach((phrase: PhrasesInstance) => {
      const phrasesWithName = {
        ...phrase.dataValues,
        name: polynomialName?.name,
      };
      allPhrases.push(phrasesWithName);
    });
  }

  const socialPhrases = allPhrases.sort(() => Math.random() - 0.5);
  return socialPhrases;
};

const getInversePoliticalPhrases = async (id: string): Promise<object[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);
  const allPhrases: Array<object> = [];

  if (!polynomialOption) {
    throw new Error('No se encontró el id de la opción del polinomio.');
  }

  const politicalPolyId = await polynomialService.getPoliticalPolyId();

  if (!politicalPolyId) {
    throw new Error('No se encontró el id del polinomio político.');
  }

  const { group } = polynomialOption.dataValues;

  if (group === null) {
    return getCombinedNeutralPoliticalInverse(id);
  }

  const Array: string[] = [polynomialOption.id];

  const inversePolyOptionId = await polynomialOptionService.getInversePolyOptionId(Array);

  const targetGroup = group?.toString() === 'Extremo 1' ? 'Extremo 2' : 'Extremo 1';

  const phrases = await Phrases.findAll({
    where: {
      group: targetGroup,
      polynomialId: politicalPolyId.id,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
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
  phrases.forEach((phrase: PhrasesInstance) => {
    const phrasesWithName = {
      ...phrase.dataValues,
      name: polynomialOption.name === 'Derecha' ? 'Izquierda' : 'Derecha',
    };
    allPhrases.push(phrasesWithName);
  });
  return allPhrases;
};

const getCombinedNeutralPoliticalPhrases = async (id: string): Promise<object[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);
  const allPhrases: Array<object> = [];
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
    attributes: { exclude: ['createdAt', 'updatedAt'] },
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
  phrasesPolarized.forEach((phrase: PhrasesInstance) => {
    const name = phrase.dataValues.group.toString() === 'Extremo 1' ? 'Derecha' : 'Izquierda';
    const phrasesWithName = {
      ...phrase.dataValues,
      name: name,
    };
    allPhrases.push(phrasesWithName);
  });

  if (!phrasesPolarized) {
    throw new Error('No se encontraron frases politicas.');
  }
  const phrases = allPhrases.sort(() => Math.random() - 0.5);
  return phrases;
};

const getCombinedNeutralPoliticalInverse = async (id: string): Promise<object[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);
  const allPhrases: Array<object> = [];

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

  const phrasesNoPolarized = await Phrases.findAll({
    where: {
      polynomialId: politicalPolyId.id,
      neutral: false,
    },
    attributes: { exclude: ['neutral', 'createdAt', 'updatedAt'] },
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
  phrasesNoPolarized.forEach((phrase: PhrasesInstance) => {
    const name = phrase.dataValues.group.toString() === 'Extremo 1' ? 'Derecha' : 'Izquierda';
    const phrasesWithName = {
      ...phrase.dataValues,
      name: name,
    };
    allPhrases.push(phrasesWithName);
  });

  if (!phrasesNoPolarized) {
    throw new Error('No se encontraron frases politicas.');
  }
  const phrases = allPhrases.sort(() => Math.random() - 0.5);
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

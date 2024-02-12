import { Phrases, PhrasesAttributes, PhrasesCreationAttributes } from '@/db/models/phrases';
import { ClientError } from '@/errors';
import { Response } from './user.service';
import { IdPhrases, PhrasesUpdateService } from '@/types';
import polynomialService from '../services/polynomial.service';
import { sequelize } from '../db/models';
import polynomialOptionService from './polynomial_option.service';
import surveyResultService from './survey_result.service';
import { SurveyResultAttributes } from '../db/models/survey_result';
import { PhrasesInstance } from '@/db/models/phrases';
import { group } from '@/enums';
import { SurveyResult } from '../db/models/survey_result';
import { PolynomialOption } from '@/db/models/polynomial_option';

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
  };
  return phraseAtt;
};

const updatePhrasesDB = async (
  { survey_results: surveyResults, ...phrasesUpdate }: PhrasesUpdateService,
  id: string,
): Promise<PhrasesAttributes> => {
  const phrase = await getPhrasesId({ id });
  if (phrase) {
    phrase.update({ text: phrasesUpdate.text, group: phrasesUpdate.group });
    const { id, text, group, polynomialId } = phrase.dataValues;
    const restPhrases = { id, text, group, polynomialId };
    await surveyResultService.updateResults(surveyResults);
    return restPhrases;
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
    attributes: { exclude: ['createdAt', 'updatedAt'] },
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

const getPoliticalPhrases = async (id: string): Promise<PhrasesAttributes[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);
  if (polynomialOption) {
    if (polynomialOption.dataValues.group === null) {
      return getCombinedPoliticalPhrases(polynomialOption.id);
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
        return phrases;
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
      if (polynomialOption.dataValues.group === null) {
        const phrases = await Phrases.findAll({
          where: {
            polynomialId: polynomialOption.dataValues.polynomialId,
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
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
        phrases.map(p => {
          allPhrases.push(p.dataValues);
        });
      } else {
        const phrases = await Phrases.findAll({
          where: {
            group: polynomialOption.dataValues.group,
            polynomialId: polynomialOption.dataValues.polynomialId,
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
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
        phrases.map((p: PhrasesInstance) => {
          allPhrases.push(p.dataValues);
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

    const phrases = await Phrases.findAll({
      where: {
        group: targetGroup,
        polynomialId: polynomialOption.dataValues.polynomialId,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
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
      allPhrases.push(phrase.dataValues);
    });
  }

  const socialPhrases = allPhrases.sort(() => Math.random() - 0.5);
  return socialPhrases;
};

const getInversePoliticalPhrases = async (id: string): Promise<PhrasesAttributes[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);

  if (!polynomialOption) {
    throw new Error('No se encontró el id de la opción del polinomio.');
  }

  const politicalPolyId = await polynomialService.getPoliticalPolyId();

  if (!politicalPolyId) {
    throw new Error('No se encontró el id del polinomio político.');
  }

  const { group } = polynomialOption.dataValues;

  if (group === null) {
    return getInverseCombinedPoliticalPhrases(politicalPolyId.id);
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
  return phrases;
};

const getCombinedPoliticalPhrases = async (id: string): Promise<PhrasesAttributes[] | void> => {
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

  const phrasesExtreme1 = await Phrases.findAll({
    where: {
      polynomialId: politicalPolyId.id,
      group: 'Extremo 1',
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    limit: 5,
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

  const phrasesExtreme2 = await Phrases.findAll({
    where: {
      polynomialId: politicalPolyId.id,
      group: 'Extremo 2',
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    limit: 5,
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

  if (!phrasesExtreme1 || !phrasesExtreme2) {
    throw new Error('No se encontraron frases politicas.');
  }
  const phrases = phrasesExtreme1.concat(phrasesExtreme2).sort(() => Math.random() - 0.5);
  return phrases;
};

const getAllPoliticalPhrases = async (): Promise<PhrasesAttributes[] | void> => {
  const politicalPolyId = await polynomialService.getPoliticalPolyId();
  if (politicalPolyId) {
    const phrases = await Phrases.findAll({
      where: {
        polynomialId: politicalPolyId.id, //ID del polinomio politico
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return phrases;
  }
  return;
};

const getInverseCombinedPoliticalPhrases = async (
  polyId: string,
): Promise<PhrasesAttributes[] | void> => {
  const polyOptionIdExt1 = await PolynomialOption.findOne({
    attributes: ['id'],
    where: {
      polynomialId: polyId,
      group: 'Extremo 1',
    },
  });

  const polyOptionIdExt2 = await PolynomialOption.findOne({
    attributes: ['id'],
    where: {
      polynomialId: polyId,
      group: 'Extremo 2',
    },
  });

  const phrasesExtreme1 = await Phrases.findAll({
    where: {
      polynomialId: polyId,
      group: 'Extremo 1',
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: SurveyResult,
        where: {
          polynomialOptionId: polyOptionIdExt1?.id,
        },
        attributes: ['percentage'],
      },
    ],
    order: [[{ model: SurveyResult, as: 'survey_results' }, 'percentage', 'DESC']],
    limit: 5,
  });

  const phrasesExtreme2 = await Phrases.findAll({
    where: {
      polynomialId: polyId,
      group: 'Extremo 2',
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: SurveyResult,
        where: {
          polynomialOptionId: polyOptionIdExt2?.id,
        },
        attributes: ['percentage'],
      },
    ],
    order: [[{ model: SurveyResult, as: 'survey_results' }, 'percentage', 'DESC']],
    limit: 5,
  });

  if (!phrasesExtreme1 || !phrasesExtreme2) {
    throw new Error('No se encontraron frases politicas.');
  }
  const phrases = phrasesExtreme1.concat(phrasesExtreme2);
  return phrases;
};

export default {
  createPhrasesDB,
  updatePhrasesDB,
  deletePhrasesDB,
  getPhrases,
  getPhrasesId,
  getPolynomialPhrases,
  getExtrmPoliticalPhrases,
  getCombinedPoliticalPhrases,
  getAllPoliticalPhrases,
  getPoliticalPhrases,
  getInversePoliticalPhrases,
  getSocialPhrases,
  getInverseSocialPhrases,
  getInverseCombinedPoliticalPhrases,
};

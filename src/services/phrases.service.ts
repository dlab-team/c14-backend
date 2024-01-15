import { Phrases, PhrasesAttributes, PhrasesCreationAttributes } from '@/db/models/phrases';
import { ClientError } from '@/errors';
import { Response } from './user.service';
import { IdPhrases, PhrasesUpdateService } from '@/types';
import polynomialService from '../services/polynomial.service';
import { Polynomial } from '@/db/models/polynomial';
import { sequelize } from '../db/models';
import polynomialOptionService from './polynomial_option.service';

const createPhrasesDB = (phrases: PhrasesCreationAttributes): Promise<PhrasesAttributes> => {
  return Phrases.create(phrases, { raw: true }).then(({ id, text, group, polynomialId }) => ({
    id,
    text,
    group,
    polynomialId,
  }));
};

const updatePhrasesDB = async (phrasesUpdate: PhrasesUpdateService): Promise<PhrasesAttributes> => {
  const phrase = await getPhrasesId(phrasesUpdate);
  if (phrase) {
    phrase.update(phrasesUpdate);
    const { id, text, group, polynomialId } = phrase.dataValues;
    const restPhrases = { id, text, group, polynomialId };
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

const getPolynomialPhrases = async (polynomialId: string): Promise<object[]> => {
  return Phrases.findAll({
    where: { polynomialId: polynomialId },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
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
      return getCombinedPoliticalPhrases();
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

const getInversePoliticalPhrases = async (id: string): Promise<PhrasesAttributes[] | void> => {
  const polynomialOption = await polynomialOptionService.getPolynomialOptionId(id);

  if (!polynomialOption) {
    throw new Error('No se encontró el id de la opción del polinomio.');
  }

  const { group } = polynomialOption.dataValues;

  if (group === null) {
    return getCombinedPoliticalPhrases();
  }

  const politicalPolyId = await polynomialService.getPoliticalPolyId();

  if (!politicalPolyId) {
    throw new Error('No se encontró el id del polinomio político.');
  }

  const targetGroup = group?.toString() === 'Extremo 1' ? 'Extremo 2' : 'Extremo 1';

  const phrases = await Phrases.findAll({
    where: {
      group: targetGroup,
      polynomialId: politicalPolyId.id,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    limit: 9,
    order: sequelize.random(),
  });

  return phrases;
};

const getCombinedPoliticalPhrases = async (): Promise<PhrasesAttributes[] | void> => {
  const politicalPolynomial = await Polynomial.findAll({
    where: {
      political: true,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  const phrasesExtreme1 = await Phrases.findAll({
    where: {
      polynomialId: politicalPolynomial[0].dataValues.id,
      group: 'Extremo 1',
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    limit: 5,
    order: sequelize.random(),
  });

  const phrasesExtreme2 = await Phrases.findAll({
    where: {
      polynomialId: politicalPolynomial[0].dataValues.id,
      group: 'Extremo 2',
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    limit: 5,
    order: sequelize.random(),
  });

  if (!phrasesExtreme1 || !phrasesExtreme2) {
    throw new Error('No se encontraron frases politicas.');
  }
  const phrases = phrasesExtreme1.concat(phrasesExtreme2);
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
};

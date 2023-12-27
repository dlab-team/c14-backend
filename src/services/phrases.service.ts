import { Phrases, PhrasesAttributes, PhrasesCreationAttributes } from '@/db/models/phrases';
import { ClientError } from '@/errors';
import { Response } from './user.service';
import { IdPhrases, PhrasesUpdateService } from '@/types';
import { Polynomial } from '@/db/models/polynomial';

const createPhrasesDB = (phrases: PhrasesCreationAttributes): Promise<PhrasesAttributes> => {
  return Phrases.create(phrases, { raw: true }).then(({ id, text, group, polynomial_id }) => ({
    id,
    text,
    group,
    polynomial_id,
  }));
};

const updatePhrasesDB = async (phrasesUpdate: PhrasesUpdateService): Promise<PhrasesAttributes> => {
  const phrase = await getPhrasesId(phrasesUpdate);
  if (phrase) {
    phrase.update(phrasesUpdate);
    const { id, text, group, polynomial_id } = phrase.dataValues;
    const restPhrases = { id, text, group, polynomial_id };
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

const getPolynomialPhrases = async (polynomialName: string) => {
  let phraseId: string;
  const polynomial = await Polynomial.findAll({
    attributes: ['id', 'name'],
  });

  const dataArray = polynomial.map(result => ({
    id: result.getDataValue('id'),
    name: result.getDataValue('name'),
  }));

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].name === polynomialName) {
      phraseId = dataArray[i].id;
      return await Phrases.findAll({
        where: { polynomial_id: phraseId },
      });
    }
  }
};

export default {
  createPhrasesDB,
  updatePhrasesDB,
  deletePhrasesDB,
  getPhrases,
  getPhrasesId,
  getPolynomialPhrases,
};

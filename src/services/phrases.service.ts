import { Phrases, PhrasesAttributes, PhrasesCreationAttributes } from '@/db/models/phrases';
import { ClientError } from '@/errors';
import { Response } from './user.service';
import { IdPhrases, PhrasesUpdateService } from '@/types';
import { Polynomial } from '@/db/models/polynomial';

const createPhrasesDB = async (phrases: PhrasesCreationAttributes): Promise<PhrasesAttributes> => {
  const { id, text, group, polynomial_id } = await Phrases.create(phrases, { raw: true });
  return {
    id,
    text,
    group,
    polynomial_id,
  };
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

const getCombinationPhrases = async () => {
  const polynomials = await Polynomial.findAll();
  const politicalId = polynomials?.find(p => p.political === true)?.id;

  const phrases = await Phrases.findAll();
  const politicalPhrases = phrases?.filter(p => p.polynomial_id === politicalId);
  if (politicalPhrases.length === 0) {
    throw new Error('No se encontraron frases politicas.');
  }
  const extreme1 = politicalPhrases.filter(item => item.group === 'Extremo 1');
  const extreme2 = politicalPhrases.filter(item => item.group === 'Extremo 2');

  function shuffleArray<PhrasesUpdateService>(
    array: PhrasesUpdateService[],
  ): PhrasesUpdateService[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }
  const randomExtreme1 = shuffleArray(extreme1).slice(0, 5);
  const randomExtreme2 = shuffleArray(extreme2).slice(0, 5);

  return { randomExtreme1, randomExtreme2 };
};

export default {
  createPhrasesDB,
  updatePhrasesDB,
  deletePhrasesDB,
  getPhrases,
  getPhrasesId,
  getCombinationPhrases,
};

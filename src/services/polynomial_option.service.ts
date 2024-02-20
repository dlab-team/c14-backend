import {
  PolynomialOption,
  PolynomialOptionAttributes,
  PolynomialOptionCreationAttributes,
} from '@/db/models/polynomial_option';
import { ClientError } from '@/errors';
import polynomialService from './polynomial.service';
import phrasesService from './phrases.service';
import surveyResultService from './survey_result.service';
import { SurveyResultAttributes } from '../db/models/survey_result';
import { group } from '@/enums';

const createPolynomialOption = async (
  polynomialOption: PolynomialOptionCreationAttributes,
): Promise<PolynomialOptionAttributes> => {
  if (
    polynomialOption.group &&
    ![group['Extremo 1'], group['Extremo 2']].includes(polynomialOption.group)
  ) {
    polynomialOption.group = null;
  }
  const option = await PolynomialOption.create(polynomialOption);
  const polyPhrases = await phrasesService.getPolynomialPhrases(option.polynomialId);
  const data: SurveyResultAttributes[] = [];
  polyPhrases.forEach(phrase => {
    data.push({
      polynomialOptionId: option.id,
      phraseId: phrase.id,
      percentage: 0,
    });
  });
  surveyResultService.createResults(data);
  return option;
};

const updatePolynomialOption = async (
  id: string,
  polynomialOptionUpdate: PolynomialOptionAttributes,
) => {
  const polynomialOption = await getPolynomialOptionId(id);
  const newPolynomias = { ...polynomialOptionUpdate, polynomialOption };
  if (polynomialOption) {
    polynomialOption.update(newPolynomias);
    return polynomialOption;
  } else {
    throw new ClientError('La opcion del polinomio a actualizar no existe', 404);
  }
};

const deletePolynomialOption = async (idPolynomialOption: string) => {
  const polynomialOption = await getPolynomialOptionId(idPolynomialOption);
  if (polynomialOption) {
    polynomialOption.destroy();
    return { success: true, message: 'Se elimino correctamente la opcion del polinomio' };
  } else {
    throw new ClientError('La opcion del polinomio a eliminar no existe', 404);
  }
};

const getPolynomialOptions = () => {
  return PolynomialOption.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
};

const getPolynomialOptionId = (idPolynomialOption: string) => {
  return PolynomialOption.findByPk(idPolynomialOption, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
};

const getPoliticalPolyOption = async () => {
  const politicalPolyId = await polynomialService.getPoliticalPolyId();
  if (politicalPolyId) {
    const politicalPolyOption = await PolynomialOption.findAll({
      where: {
        polynomialId: politicalPolyId.id, //ID del polinomio politico
      },
      attributes: ['id', 'name'],
    });
    return politicalPolyOption;
  }
  return;
};

const getPolyOptionsFromPolyId = async (
  polynomialId: string,
): Promise<PolynomialOptionAttributes[]> => {
  const polyOptions = await PolynomialOption.findAll({
    where: {
      polynomialId,
    },
    attributes: ['id', 'name'],
  });
  return polyOptions;
};

const getInversePolyOptionId = async (ids: Array<string>) => {
  const allPolyOptions: Array<string> = [];
  for (const option of ids) {
    const polynomialOption = await getPolynomialOptionId(option);
    if (!polynomialOption) {
      throw new Error('No se encontró el id de la opción del polinomio.');
    }
    let inversePolyOption;
    if (polynomialOption.group === null) {
      inversePolyOption = await PolynomialOption.findOne({
        attributes: ['id', 'group'],
        where: {
          polynomialId: polynomialOption?.polynomialId,
          group: ['Extremo 1' || 'Extremo 2'],
        },
      });
    } else if (polynomialOption.group?.toString() === 'Extremo 1') {
      inversePolyOption = await PolynomialOption.findOne({
        attributes: ['id', 'group'],
        where: {
          polynomialId: polynomialOption?.polynomialId,
          group: 'Extremo 2',
        },
      });
    } else if (polynomialOption.group?.toString() === 'Extremo 2') {
      inversePolyOption = await PolynomialOption.findOne({
        attributes: ['id', 'group'],
        where: {
          polynomialId: polynomialOption?.polynomialId,
          group: 'Extremo 1',
        },
      });
    }
    if (!inversePolyOption) {
      throw new Error('No se encontró la opción de polinomio inversa.');
    }
    allPolyOptions.push(inversePolyOption.id);
  }
  return allPolyOptions;
};

export default {
  createPolynomialOption,
  getPolynomialOptionId,
  updatePolynomialOption,
  deletePolynomialOption,
  getPolynomialOptions,
  getPoliticalPolyOption,
  getPolyOptionsFromPolyId,
  getInversePolyOptionId,
};

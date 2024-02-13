import { Op } from 'sequelize';
import { ClientError, ServerError } from '@/errors';
import { SurveyResponse, SurveyResponseAttributes } from '@/db/models/survey_response';
import { SurveyResponseProfile } from '@/db/models/survey_response_profile';
import { PolynomialOption } from '@/db/models/polynomial_option';
import { SurveyResponseCharacter } from '@/types';

const createResponse = async (
  data: SurveyResponseAttributes,
): Promise<SurveyResponseAttributes> => {
  try {
    const response = await SurveyResponse.create(data);
    return response;
  } catch (error) {
    throw new ServerError(error as string, 500);
  }
};

const getGroupedPolynomialOptions = async (PolynomialId: string) => {
  try {
    const arrayResponse = [];
    const PolynomialsOptions = await PolynomialOption.findAll({
      where: {
        polynomialId: PolynomialId,
      },
    });
    for (const option of PolynomialsOptions) {
      const quantity = await SurveyResponseProfile.count({
        where: {
          polynomialOptionId: option.dataValues.id,
        },
      });
      const polynomialOption = {
        name: option.name,
        quantity: quantity,
      };
      arrayResponse.push(polynomialOption);
    }
    return arrayResponse;
  } catch (error) {
    throw new ServerError(error as string, 500);
  }
};

const getMetrics = async () => {
  try {
    const unfinished = await SurveyResponse.findAll({
      attributes: ['id'],
      where: {
        finishDate: null,
      },
    });
    const finished = await SurveyResponse.findAll({
      attributes: ['id'],
      where: {
        finishDate: {
          [Op.not]: null,
        },
      },
    });
    return { unfinished: unfinished.length, finished: finished.length };
  } catch (error) {
    throw new ServerError(error as string, 500);
  }
};

const responseCharater = async ({
  id,
  polinomialOptionsId,
  finishedSocialForm,
}: SurveyResponseCharacter) => {
  const finishDate = new Date();
  const response = await SurveyResponse.findByPk(id);
  if (response) {
    const duration = finishDate.getTime() - response.startDate.getTime();
    await response.update({ duration, finishDate, finishedSocialForm });
    const profile = polinomialOptionsId.map(idOption => {
      return SurveyResponseProfile.create({
        surveyResponseId: response.id,
        polynomialOptionId: idOption,
      });
    });
    return Promise.all(profile);
  } else {
    throw new ClientError('El id no corresponde', 403);
  }
};

export default { createResponse, getMetrics, responseCharater, getGroupedPolynomialOptions };

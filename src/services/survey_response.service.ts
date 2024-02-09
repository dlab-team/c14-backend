import { ClientError, ServerError } from '@/errors';
import { SurveyResponse, SurveyResponseAttributes } from '@/db/models/survey_response';
import { Op } from 'sequelize';
import { SurveyResponseCharacter } from '@/types';
import { SurveyResponseProfile } from '@/db/models/survey_response_profile';

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

const responseCharater = async ({ id, polinomialOptionsId }: SurveyResponseCharacter) => {
  const finishDate = new Date();
  const response = await SurveyResponse.findByPk(id);
  if (response) {
    const duration = finishDate.getTime() - response.startDate.getTime();
    response.update({ duration, finishDate });
    const profile = polinomialOptionsId.map(idOption => {
      return SurveyResponseProfile.create({
        surveyResponseId: response.id,
        polynomialOptionId: idOption,
      });
    });
    return profile;
  } else {
    throw new ClientError('El id no corresponde', 403);
  }
};

export default { createResponse, getMetrics, responseCharater };

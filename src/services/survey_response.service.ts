import { ServerError } from '@/errors';
import { SurveyResponse, SurveyResponseAttributes } from '@/db/models/survey_response';
import { Op } from 'sequelize';

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

export default { createResponse, getMetrics };

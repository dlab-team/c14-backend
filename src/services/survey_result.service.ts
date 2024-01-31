import { SurveyResult, SurveyResultAttributes } from '@/db/models/survey_result';
import { Response } from './user.service';
import { ServerError } from '@/errors';

const createResults = async (data: SurveyResultAttributes[]): Promise<Response | undefined> => {
  try {
    await SurveyResult.bulkCreate(data);
    return {
      success: true,
      message: 'Result created',
    };
  } catch (error) {
    throw new ServerError(error as string, 500);
  }
};

export default { createResults };

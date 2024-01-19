import { SurveyResult, SurveyResultAttributes } from '@/db/models/survey_result';
import { Response } from './user.service';
import { ServerError } from '@/errors';

const createPhraseResults = async (data: SurveyResultAttributes): Promise<Response | undefined> => {
  try {
    await SurveyResult.create(data, { raw: true });
    return {
      success: true,
      message: 'Phrase result created',
    };
  } catch (error) {
    throw new ServerError('Server error', 500);
  }
};

export default { createPhraseResults };

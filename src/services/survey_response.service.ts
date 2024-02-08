import { ServerError } from '@/errors';
import { SurveyResponse, SurveyResponseAttributes } from '@/db/models/survey_response';
import { SurveyResponseProfile } from '@/db/models/survey_response_profile';
import { PolynomialOption } from '@/db/models/polynomial_option';

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

export default { createResponse, getGroupedPolynomialOptions };

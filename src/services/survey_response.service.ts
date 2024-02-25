import { Op, Sequelize } from 'sequelize';
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

    const totalAmount = await SurveyResponse.findOne({
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('duration')), 'total'],
      ],
      where: {
        finishDate: {
          [Op.not]: null,
        },
      },
      raw: true,
    })

    const duration = totalAmount ? parseInt(totalAmount.total) : 0;

    return { unfinished: unfinished.length, finished: finished.length, duration: duration };
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

const getGroupedResponsesByYear = async () => {
  try {
    const responses = await SurveyResponse.findAll({
      attributes: [
        [Sequelize.fn('DATE_TRUNC', Sequelize.literal("'year'"), Sequelize.col('startDate')), 'label'],
        [
          Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "finishedSocialForm" IS NOT NULL THEN 1 END')),
          'Visitas',
        ],
        [
          Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "finishDate" IS NOT NULL THEN 1 END')),
          'Finalizadas',
        ],
      ],
      group: [Sequelize.fn('DATE_TRUNC', Sequelize.literal("'year'"), Sequelize.col('startDate'))],
      raw: true,
      order: [['label', 'ASC']],
    });

    responses.forEach((response) => {
      const date = new Date(response.label);
      const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
      response.label = adjustedDate.getFullYear().toString();
    });

    return responses;
  } catch (error) {
    throw new ServerError(error as string, 500);
  }
};
  
const getGroupedResponseForAYear = async (year: string) => {
  try {
    const responses = await SurveyResponse.findAll({
      attributes: [
        [Sequelize.fn('DATE_TRUNC', Sequelize.literal("'month'"), Sequelize.col('startDate')), 'label'],
        [
          Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "finishedSocialForm" IS NOT NULL THEN 1 END')),
          'Visitas',
        ],
        [
          Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "finishDate" IS NOT NULL THEN 1 END')),
          'Finalizadas',
        ],
      ],
      where: Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "startDate"')), year),
      group: [Sequelize.fn('DATE_TRUNC', Sequelize.literal("'month'"), Sequelize.col('startDate'))],
      order: [['label', 'ASC']],
      raw: true,
    });

    responses.forEach((response) => {
      const date = new Date(response.label);
      const monthIndex = date.getUTCMonth();
      const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      response.label = monthNames[monthIndex];
    });
    
    return responses;
  } catch (error) {
    throw new ServerError(error as string, 500);
  }
};

export default { createResponse, getMetrics, responseCharater, getGroupedPolynomialOptions, getGroupedResponsesByYear, getGroupedResponseForAYear };

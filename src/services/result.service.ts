import { SubjectiveResult, SubjectiveResultCreate } from '@/db/models/subjectiveResult';
import { ResultOpinion, ResultOpinionCreate } from '@/db/models/resultOpinion';
import { SubjectiveResultAttributes, ResultOpinionAttributes } from '@/types';

export const createNumberResult = async (
  resultData: SubjectiveResultCreate,
): Promise<SubjectiveResultAttributes> => {
  const createNumberResultDB = await SubjectiveResult.create(resultData, {
    fields: ['id', 'phraseId', 'surveyResponseId', 'value'],
  });
  return createNumberResultDB;
};
export const createOpinionResult = async (
  resultData: ResultOpinionCreate,
): Promise<ResultOpinionAttributes> => {
  const createStringResultDB = (await ResultOpinion.create(resultData)).dataValues;
  return createStringResultDB;
};

export const createOpinionResultArray = async (
  resultData: ResultOpinionCreate[],
): Promise<ResultOpinionAttributes[]> => {
  const createStringResultDB = (await ResultOpinion.bulkCreate(resultData)).map(
    opinion => opinion.dataValues,
  );
  return createStringResultDB;
};

export const createSubjetiveResultArray = async (
  resultData: SubjectiveResultCreate[],
): Promise<SubjectiveResultAttributes[]> => {
  const createNumberResultDB = (await SubjectiveResult.bulkCreate(resultData)).map(
    subjetive => subjetive.dataValues,
  );
  return createNumberResultDB;
};

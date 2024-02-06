import { SurveyResultAttributes } from '@/db/models/survey_result';
import surveyResultService from '@/services/survey_result.service';
import { NextFunction, Request, Response } from 'express';

const createResult = async (req: Request, res: Response, next: NextFunction) => {
  const surveyResult: SurveyResultAttributes[] = req.body;
  try {
    const surveyCreated = await surveyResultService.createResults(surveyResult);
    res.status(201).json(surveyCreated);
  } catch (error) {
    next(error);
  }
};

export default {
  createResult,
};

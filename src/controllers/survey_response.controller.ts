import { SurveyResponseAttributes } from '@/db/models/survey_response';
import surveyResponseService from '@/services/survey_response.service';
import { NextFunction, Request, Response } from 'express';

const createResponse = async (req: Request, res: Response, next: NextFunction) => {
  const surveyResponse: SurveyResponseAttributes = req.body;
  try {
    const surveyResponseCreated = await surveyResponseService.createResponse(surveyResponse);
    res.status(201).json(surveyResponseCreated);
  } catch (error) {
    next(error);
  }
};

const getGroupedPolynomialOptions = async (req: Request, res: Response, next: NextFunction) => {
  const { polynomialId } = req.params;
  try {
    const surveyResponseCreated =
      await surveyResponseService.getGroupedPolynomialOptions(polynomialId);
    res.status(201).json(surveyResponseCreated);
  } catch (error) {
    next(error);
  }
};

export default {
  createResponse,
  getGroupedPolynomialOptions,
};

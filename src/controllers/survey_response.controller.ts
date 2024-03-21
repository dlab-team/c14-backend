import { NextFunction, Request, Response } from 'express';
import { SurveyResponseAttributes } from '@/db/models/survey_response';
import surveyResponseService from '@/services/survey_response.service';
import { ResponseAllData } from '@/types';

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

const getMetrics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const metrics = await surveyResponseService.getMetrics();
    res.status(200).json(metrics);
  } catch (error) {
    next(error);
  }
};

const finishResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: ResponseAllData = req.body;
    const character = await surveyResponseService.responseCharater(data);
    res.status(201).json(character);
  } catch (error) {
    next(error);
  }
};

const getGroupedResponsesByYear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responses = await surveyResponseService.getGroupedResponsesByYear();
    res.status(200).json(responses);
  } catch (error) {
    next(error);
  }
};

const getGroupedResponseForAYear = async (req: Request, res: Response, next: NextFunction) => {
  const { year } = req.params;
  try {
    const responses = await surveyResponseService.getGroupedResponseForAYear(year);
    res.status(200).json(responses);
  } catch (error) {
    next(error);
  }
};

export default {
  createResponse,
  getGroupedPolynomialOptions,
  getMetrics,
  finishResponse,
  getGroupedResponsesByYear,
  getGroupedResponseForAYear,
};

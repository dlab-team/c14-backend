import { SubjectiveResultCreate } from '@/db/models/subjectiveResult';
import { ResultOpinionCreate } from '@/db/models/resultOpinion';
import { Request, Response, NextFunction } from 'express';
import * as resultService from '@/services/result.service';

export const createResultOpinion = async (req: Request, res: Response, next: NextFunction) => {
  const resultData: ResultOpinionCreate = req.body;
  try {
    const createResultString = await resultService.createOpinionResult(resultData);
    res.status(201).json(createResultString);
  } catch (error) {
    next(error);
  }
};

export const createResultSubjetive = async (req: Request, res: Response, next: NextFunction) => {
  const resultData: SubjectiveResultCreate = req.body;
  try {
    const createResultNumber = await resultService.createNumberResult(resultData);
    res.status(201).json(createResultNumber);
  } catch (error) {
    next(error);
  }
};

import { SubjectiveResultCreate } from '@/db/models/subjectiveResult';
import { ResultOpinionCreate } from '@/db/models/resultOpinion';
import { Request, Response, NextFunction } from 'express';
import * as resultService from '@/services/result.service';
// import { AuthenticatedRequest } from '@/middleware/isAuthenticated';

export const createResult = async (req: Request, res: Response, next: NextFunction) => {
  const resultData: SubjectiveResultCreate | ResultOpinionCreate = req.body;
  try {
    if (typeof resultData.value == 'number') {
      const createResultNumber = await resultService.createNumberResult(
        resultData as SubjectiveResultCreate,
      );
      res.status(201).json(createResultNumber);
    } else {
      const createResultString = await resultService.createStringResult(
        resultData as ResultOpinionCreate,
      );
      res.status(201).json(createResultString);
    }
  } catch (error) {
    next(error);
  }
};

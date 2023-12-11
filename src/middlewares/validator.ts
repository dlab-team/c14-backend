import { NextFunction, Request, Response } from 'express';

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
  next();
};

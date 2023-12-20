import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ClientError } from '@/errors';

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const keys = Object.keys(errors.mapped());
    throw new ClientError(keys.map(key => `${key}: ${errors.mapped()[key].msg}`).join(' ,'), 400);
  }
  next();
};

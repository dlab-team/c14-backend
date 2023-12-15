import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ClientError } from '@/errors';

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ClientError(
      errors
        .array()
        .map(({ msg }) => `${msg}`)
        .join(', '),
      400,
    );
  }
  next();
};

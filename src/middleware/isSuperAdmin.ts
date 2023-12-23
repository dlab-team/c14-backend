import { verifyToken } from '@/helpers';
import { Request, Response, NextFunction } from 'express';
import userService from '@/services/user.service';
import { AuthenticatedRequest } from './isAuthenticated';

export const isSuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const accessTokenInCookie = req.cookies?.accessToken;

  if (!accessTokenInCookie) {
    res.sendStatus(401);
    return;
  } else {
    const decoded = verifyToken(accessTokenInCookie);
    const userData = await userService.getUserByEmail(decoded.email);
    if (userData?.superAdmin) {
      (req as AuthenticatedRequest).decoded = decoded;
      next();
    } else {
      res.sendStatus(401);
      return;
    }
  }
};

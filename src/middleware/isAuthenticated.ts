import { Request, Response, NextFunction } from 'express';
import { signToken, verifyToken } from '../helpers/jsonToken.js';

export interface AuthenticatedRequest extends Request {
  decoded?: { id: string; email: string };
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const accessTokenInCookie = req.cookies?.accessToken;
  const refreshTokenInCookie = req.cookies?.refreshToken;
  const accessToken = accessTokenInCookie && accessTokenInCookie.split(' ')[1];
  const refreshToken = refreshTokenInCookie && refreshTokenInCookie.split(' ')[1];

  try {
    if (!accessToken && !refreshToken) {
      res.sendStatus(401);
      return;
    }

    if (accessToken) {
      const decoded = verifyToken(accessToken);
      if (decoded) {
        (req as AuthenticatedRequest).decoded = decoded as { email: string; id: string };
        return next();
      }
    }
    if (refreshToken) {
      const decoded = verifyToken(refreshToken) as { email: string; id: string };
      if (decoded) {
        const tokenPayload = { email: decoded.email, id: decoded.id };
        const accessToken = signToken(tokenPayload);
        res.cookie('accessToken', 'Bearer ' + accessToken, {
          maxAge: 60_000 * 60 * 24 * 7, // 7 days
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        return next();
      }
    }

    res.sendStatus(403);
  } catch (error) {
    res.sendStatus(403);
  }
};

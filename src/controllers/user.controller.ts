import { NextFunction, Request, Response } from 'express';
import userService from '@/services/user.service';
import { ClientError } from '@/errors';
import { hashText } from '../helpers/argon';
import { UserCreationAttributes } from '@/db/models/user';
import { AuthenticatedRequest } from '@/middleware/isAuthenticated';

//Create User
const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: UserCreationAttributes = req.body;
    const response = await userService.createUser(userData);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

//Read Users
const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

//Delete one user

const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  const superAdmin = req.decoded;
  if (superAdmin?.id != id) {
    try {
      const response = await userService.deleteUser(id);

      if (response) {
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  } else {
    res.sendStatus(401);
    return;
  }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;
  try {
    const data = await userService.loginBd(email.toLowerCase(), password);
    const { token, ...userData } = data;
    res
      .status(200)
      .cookie('accessToken', token, {
        maxAge: 60 * 60 * 25 * 7 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .json(userData);
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).clearCookie('accessToken').json({
      success: true,
      message: 'User Logged out',
    });
  } catch (error) {
    next(error);
  }
};

const forgotPass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email: string = req.body.email;
    const response = await userService.forgotPass(email);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const changePass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const auth = req.headers.authorization;
    const { newPassword } = req.body;
    const hashedPassword = await hashText(newPassword);
    if (!auth) {
      throw new ClientError('Invalid Credentials', 400);
    } else {
      const response = await userService.changePass(auth, hashedPassword);
      if (response) {
        res.json({
          response,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, newPassword } = req.body;
    const id = (req as AuthenticatedRequest).decoded?.id;
    if (id) {
      const response = await userService.updatePassword(id, password, newPassword);
      res.json(response);
    } else {
      throw new ClientError('Id de usuario invalido', 400);
    }
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { firstName, lastName } = req.body;
    if (req.decoded && firstName && lastName) {
      const response = await userService.updateProfileDB(req.decoded.id, { firstName, lastName });
      if (response) {
        res.json({
          response,
        });
      }
    } else {
      throw new ClientError('Invalid information', 400);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
  login,
  createUser,
  deleteUser,
  forgotPass,
  changePass,
  updatePassword,
  updateProfile,
  logout,
};

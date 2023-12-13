import { NextFunction, Request, Response } from 'express';
import userService from '@/services/user.service';
import { ClientError } from '@/errors';
import { hashText } from '../helpers/argon';
import { UserCreationAttributes } from '@/db/models/user';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: { email: string; password: string } = req.body;
  try {
    const data = await userService.loginBd(email.toLowerCase(), password);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: UserCreationAttributes = req.body;
    const response = await userService.createUser(userData);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const forgotPass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email: string = req.body.email;
    const response = await userService.forgotPass(email);
    res.json({
      response,
    });
  } catch (error) {
    next(error);
  }
};

const changePass = async (req: Request, res: Response, next: NextFunction) => {
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

export default {
  getAllUsers,
  login,
  createUser,
  forgotPass,
  changePass,
};

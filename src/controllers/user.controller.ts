import { NextFunction, Request, Response } from 'express';
import userService from '@/services/user.service';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const data = await userService.loginBd(email, password);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
  login,
};

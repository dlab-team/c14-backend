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

export default {
  getAllUsers,
};
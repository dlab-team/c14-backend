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

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const response = await userService.createUser(userData);
    res.json({
      response,
    });
  } catch (error) {
    next(error);
  }
};

const forgotPass = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const email = req.body.email;
    
  } catch (error) {
    next(error)    
  }
}

export default {
  getAllUsers,
  createUser,
  forgotPass
};

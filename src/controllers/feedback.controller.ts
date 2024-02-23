import { NextFunction, Request, Response } from 'express';
import feedbackService from '@/services/feedback.service';
import { FeedbackCreationAttributes } from '@/db/models/feedback';

const getAllFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allFeeback = await feedbackService.getAllFeedback();
      res.status(200).json(allFeeback);
    } catch (error) {
      next(error);
    }
  };

  const createFeedback = async (req: Request, res: Response, next: NextFunction) => {
    const feedback: FeedbackCreationAttributes = req.body;
    try {
      const feedbackCreate = await feedbackService.createFeedback(feedback);
      res.status(201).json(feedbackCreate);
    } catch (error) {
      next(error);
    }
  };

  export default {
    getAllFeedback,
    createFeedback
  }
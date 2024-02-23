import { Router } from 'express';
import feedbackController from '@/controllers/feedback.controller';
import { isAuthenticated } from '@/middleware';
import validate from '@/middleware/validator';
const router = Router();

router.get('/', isAuthenticated, feedbackController.getAllFeedback);
router.post(
    '/',
    isAuthenticated,
    validate.validateFeedback,
    feedbackController.createFeedback,
  );

export default router;
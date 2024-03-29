import { Router } from 'express';
import feedbackController from '@/controllers/feedback.controller';
import { isAuthenticated } from '@/middleware';
import validate from '@/middleware/validator';
const router = Router();

router.get('/', isAuthenticated, feedbackController.getAllFeedback);
router.post(
    '/',
    validate.validateFeedback,
    feedbackController.createFeedback,
  );
router.delete('/:id', isAuthenticated, feedbackController.deleteFeedback);

export default router;
import {
    Feedback,
    FeedbackAttributes,
    FeedbackCreationAttributes,
  } from '@/db/models/feedback';

  const getAllFeedback = () => {
    return Feedback.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['createdAt', 'DESC']],
    });
  };

  const createFeedback = async (feedback: FeedbackCreationAttributes,): Promise<FeedbackAttributes> => {
    return Feedback.create(feedback, { raw: true }).then(
      ({ id, feedback, rating }) => ({ id, feedback, rating }),
    ) 
  }

  export default {
    getAllFeedback,
    createFeedback
  }
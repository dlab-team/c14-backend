import {
    Feedback,
    FeedbackAttributes,
    FeedbackCreationAttributes,
  } from '@/db/models/feedback';
import { ClientError } from '@/errors';

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

  const deleteFeedback = async (id: string) => {
    const feedback = await Feedback.findOne({
      where: {
        id: id,
      }
    });
    if (feedback) {
      const resp = await Feedback.destroy({ where: { id: id } });
      if (resp) {
        return {
          success: true,
          message: 'Feedback deleted',
        }
      } else {
        throw new ClientError('Feedback not found', 400);
      } 
    } else  {
      throw new ClientError('Feedback not found', 400);
    }
  }


  export default {
    getAllFeedback,
    createFeedback,
    deleteFeedback
  }
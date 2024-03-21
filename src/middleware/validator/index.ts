import { validatePolynomialCreate, validatePolynomialUpdate } from './polynomial.validator';
import { resultProfile } from './surveyResultProfile.validator';
import { validateFeedback } from './feedback.validator';
import { validateResultOpinion, validateResultSubjetive } from './result';

export default {
  validatePolynomialCreate,
  validatePolynomialUpdate,
  resultProfile,
  validateFeedback,
  validateResultOpinion,
  validateResultSubjetive,
};

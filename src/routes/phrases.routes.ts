import { Router } from 'express';
import phrasesController from '@/controllers/phrases.controller';
import quizController from '@/controllers/quiz.controller';
import { isAuthenticated } from '@/middleware';
const router = Router();

router.get('/', phrasesController.getAllPhrases);
router.get('/polynomial/:polynomialId', phrasesController.getPolynomialPhrases);
router.get('/political/:group', phrasesController.getPoliticalPhrases);
router.get('/political/', phrasesController.getAllPoliticalPhrases);
router.get('/:id', phrasesController.getPhrasesId);
router.put('/:id', isAuthenticated, phrasesController.putPhrases);
router.post('/', isAuthenticated, phrasesController.createPhrases);
router.delete('/:id', isAuthenticated, phrasesController.deletePhrases);

router.get('/neutral/political', phrasesController.getNeutralPhrases);
router.put('/neutral/political/:phraseId', phrasesController.putPhrasesPolarized);

// TODO: Evaluar si quitar estas funciones
router.post('/neutral/polarized', quizController.getPoliticalNeutralPolarized);
router.post('/neutral/inverse', quizController.getPoliticalNeutralInverse);
// TODO: Evaluar si quitar estas funciones

router.post('/bygroup/political', quizController.getPoliticalPhrasesByGroup);
router.post('/inverse/political', quizController.getInversePoliticalPhrasesByGroup);
router.post('/bygroup/social', quizController.getSocialPhrasesByGroup);
router.post('/inverse/social', quizController.getInverseSocialPhrasesByGroup);

export default router;

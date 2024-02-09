import { Router } from 'express';
import phrasesController from '@/controllers/phrases.controller';
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

router.post('/neutral/political', phrasesController.getCombinedPoliticalPhrases);
router.post('/bygroup/political', phrasesController.getPoliticalPhrasesByGroup);
router.post('/inverse/political', phrasesController.getInversePoliticalPhrasesByGroup);
router.post('/bygroup/social', phrasesController.getSocialPhrasesByGroup);
router.post('/inverse/social', phrasesController.getInverseSocialPhrasesByGroup);

export default router;

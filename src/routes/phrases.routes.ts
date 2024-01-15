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

router.get('/neutral/political', phrasesController.getCombinedPoliticalPhrases);
router.get('/bygroup/political', phrasesController.getPoliticalPhrasesByGroup);
router.get('/inverse/political', phrasesController.getInversePoliticalPhrasesByGroup);

export default router;

import { Router } from 'express';
import phrasesController from '@/controllers/phrases.controller';
const router = Router();

router.get('/', phrasesController.getAllPhrases);
router.get('/polynomial/:polynomialId', phrasesController.getPolynomialPhrases);
router.get('/:id', phrasesController.getPhrasesId);
router.put('/:id', phrasesController.putPhrases);
router.post('/', phrasesController.createPhrases);
router.delete('/:id', phrasesController.deletePhrases);

router.get('/political/:group', phrasesController.getPoliticalPhrases);
router.get('/neutral/political', phrasesController.getCombinedPoliticalPhrases);

export default router;

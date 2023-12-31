import { Router } from 'express';
import phrasesController from '@/controllers/phrases.controller';
const router = Router();

router.get('/', phrasesController.getAllPhrases);
router.get('/:id', phrasesController.getPhrasesId);
router.get('/political', phrasesController.getCombinationPhrases);
router.put('/:id', phrasesController.putPhrases);
router.post('/', phrasesController.createPhrases);
router.delete('/:id', phrasesController.deletePhrases);

router.get('/political/:group', phrasesController.getPoliticalPhrases);

export default router;

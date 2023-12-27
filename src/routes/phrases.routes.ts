import { Router } from 'express';
import phrasesController from '@/controllers/phrases.controller';
const router = Router();

router.get('/', phrasesController.getAllPhrases);
router.get('/:id', phrasesController.getPhrasesId);
router.put('/:id', phrasesController.putPhrases);
router.post('/', phrasesController.createPhrases);
router.delete('/:id', phrasesController.deletePhrases);

export default router;
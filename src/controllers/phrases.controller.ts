import { NextFunction, Request, Response } from 'express';
import phrasesService from '../services/phrases.service';
import { PhrasesCreationAttributes } from '@/db/models/phrases';
import { PhrasesAttributesOptional } from '@/types';
import { ClientError } from '@/errors';

const createPhrases = async (req: Request, res: Response, next: NextFunction) => {
  const Phrases: PhrasesCreationAttributes = req.body;
  try {
    const PhrasesCreate = await phrasesService.createPhrasesDB(Phrases);
    res.status(201).json(PhrasesCreate);
  } catch (error) {
    next(error);
  }
};

const putPhrases = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const Phrases: PhrasesAttributesOptional = req.body;
  try {
    const phrasesUpdate = await phrasesService.updatePhrasesDB({ ...Phrases, id });
    res.status(200).json(phrasesUpdate);
  } catch (error) {
    next(error);
  }
};

const deletePhrases = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const PhrasesDelete = await phrasesService.deletePhrasesDB({ id });
    res.status(200).json(PhrasesDelete);
  } catch (error) {
    next(error);
  }
};

const getPhrasesId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const polinomial = await phrasesService.getPhrasesId({ id });
    if (!polinomial) {
      throw new ClientError('No existe ese id de polynomio', 404);
    }
    res.status(200).json(polinomial);
  } catch (error) {
    next(error);
  }
};

const getAllPhrases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allPhrases = await phrasesService.getPhrases();
    res.status(200).json(allPhrases);
  } catch (error) {
    next(error);
  }
};

const getPolynomialPhrases = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query as { name?: string };
  if (name) {
    try {
      const phrases = await phrasesService.getPolynomialPhrases(name);
      res.status(200).json(phrases);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json({ error: 'El nombre del polinomio es incorrecto' });
  }
};

export default {
  createPhrases,
  putPhrases,
  deletePhrases,
  getPhrasesId,
  getAllPhrases,
  getPolynomialPhrases,
};

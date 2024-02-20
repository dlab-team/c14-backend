import { NextFunction, Request, Response } from 'express';
import phrasesService from '../services/phrases.service';
import { PhrasesCreationAttributes } from '@/db/models/phrases';
import { IdsSocials, PhrasesUpdateService } from '@/types';
import { SurveyResultAttributes } from '@/db/models/survey_result';
import { ClientError } from '@/errors';
import { groups } from '@/enums';

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
  const phrase: PhrasesUpdateService & { survey_results: SurveyResultAttributes[] } = req.body;
  try {
    const phrasesUpdate = await phrasesService.updatePhrasesDB(phrase, id);
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
  const { polynomialId } = req.params;
  try {
    const phrases = await phrasesService.getPolynomialPhrases(polynomialId);
    if (!phrases) {
      throw new ClientError('No existe el id del polinomio', 404);
    }
    res.status(200).json(phrases);
  } catch (error) {
    next(error);
  }
};

const getPoliticalPhrases = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { group } = req.params;
  try {
    if (!groups.includes(group)) {
      throw new ClientError('Grupo no encontrado');
    }
    const phrases = await phrasesService.getExtrmPoliticalPhrases(group);
    res.status(200).json(phrases);
  } catch (error) {
    next(error);
  }
};

const getPoliticalPhrasesByGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.body;
  try {
    if (!id) {
      throw new ClientError('Debe ingresar el id de una opcion de polinomio por body');
    }
    const phrases = await phrasesService.getPoliticalPhrases(id);
    res.status(200).json(phrases);
  } catch (error) {
    next(error);
  }
};

const getSocialPhrasesByGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { ids }: IdsSocials = req.body;
  try {
    if (!ids) {
      throw new ClientError('Debe ingresar los id de las opciones de polinomios por body');
    }
    const phrases = await phrasesService.getSocialPhrases(ids);
    res.status(200).json({ phrases });
  } catch (error) {
    next(error);
  }
};

const getInverseSocialPhrasesByGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { ids } = req.body;
  try {
    if (!ids) {
      throw new ClientError('Debe ingresar los id de las opciones de polinomios por body');
    }
    const phrases = await phrasesService.getInverseSocialPhrases(ids);
    res.status(200).json({ phrases });
  } catch (error) {
    next(error);
  }
};

const getInversePoliticalPhrasesByGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.body;
  try {
    if (!id) {
      throw new ClientError('Debe ingresar el id de una opcion de polinomio por body');
    }
    const phrases = await phrasesService.getInversePoliticalPhrases(id);
    res.status(200).json(phrases);
  } catch (error) {
    next(error);
  }
};

const getPoliticalNeutralPolarized = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  try {
    if (!id) {
      throw new ClientError('Debe ingresar el id de una opcion de polinomio por body');
    }
    const combinatedPhrases = await phrasesService.getCombinedNeutralPoliticalPhrases(id);
    res.status(200).json(combinatedPhrases);
  } catch (error) {
    next(error);
  }
};
const getAllPoliticalPhrases = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const phrases = await phrasesService.getAllPoliticalPhrases();
    res.status(200).json(phrases);
  } catch (error) {
    next(error);
  }
};

const getPoliticalNeutralInverse = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  try {
    if (!id) {
      throw new ClientError('Debe ingresar el id de una opcion de polinomio por body');
    }
    const combinatedPhrases = await phrasesService.getCombinedNeutralPoliticalInverse(id);
    res.status(200).json(combinatedPhrases);
  } catch (error) {
    next(error);
  }
};

const getNeutralPhrases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const neutralPhrases = await phrasesService.allNeutralPhares();
    res.json(neutralPhrases);
  } catch (error) {
    next(error);
  }
};

const putPhrasesPolarized = async (req: Request, res: Response, next: NextFunction) => {
  const { phraseId } = req.params;
  try {
    const updatePolarized = await phrasesService.updatePolarized(phraseId);
    res.status(200).json(updatePolarized);
  } catch (error) {
    next(error);
  }
};

export default {
  createPhrases,
  putPhrases,
  deletePhrases,
  getPhrasesId,
  getAllPhrases,
  getPolynomialPhrases,
  getPoliticalPhrases,
  getPoliticalNeutralPolarized,
  getAllPoliticalPhrases,
  getPoliticalPhrasesByGroup,
  getInversePoliticalPhrasesByGroup,
  getSocialPhrasesByGroup,
  getInverseSocialPhrasesByGroup,
  getPoliticalNeutralInverse,
  getNeutralPhrases,
  putPhrasesPolarized,
};

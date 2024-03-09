import { NextFunction, Request, Response } from 'express';
import { ClientError } from '@/errors';
import {
  PolynomialOptionCreationAttributes,
  PolynomialOptionAttributes,
} from '@/db/models/polynomial_option';
import polynomialOptionService from '@/services/polynomial_option.service';

const createPolynomialOption = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const polynomialOption: PolynomialOptionCreationAttributes = req.body;
  try {
    const polynomialOptionsCreate =
      await polynomialOptionService.createPolynomialOption(polynomialOption);
    res.status(201).json(polynomialOptionsCreate);
  } catch (error) {
    next(error);
  }
};

const putPolynomialOption = async (req: Request, res: Response, next: NextFunction) => {
  const polynomial: PolynomialOptionAttributes = req.body;
  const { id } = req.params;
  try {
    const polynomialUpdate = await polynomialOptionService.updatePolynomialOption(id, polynomial);
    res.status(200).json(polynomialUpdate);
  } catch (error) {
    next(error);
  }
};

const deletePolynomialOption = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const polynomialOptionDelete = await polynomialOptionService.deletePolynomialOption(id);
    res.status(200).json(polynomialOptionDelete);
  } catch (error) {
    next(error);
  }
};

const getPolynomialsOptionId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const polinomialOption = await polynomialOptionService.getPolynomialOptionId(id);
    if (!polinomialOption) {
      throw new ClientError('No existe el id de la opcion del polinomio', 404);
    }
    res.status(200).json(polinomialOption);
  } catch (error) {
    next(error);
  }
};

const getAllPolynomialsOption = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allPolynomialsOptions = await polynomialOptionService.getPolynomialOptions();
    res.status(200).json(allPolynomialsOptions);
  } catch (error) {
    next(error);
  }
};

const getPoliticalPolyOption = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const politicalPolyOption = await polynomialOptionService.getPoliticalPolyOption();
    res.status(200).json(politicalPolyOption);
  } catch (error) {
    next(error);
  }
};

export default {
  createPolynomialOption,
  putPolynomialOption,
  deletePolynomialOption,
  getAllPolynomialsOption,
  getPolynomialsOptionId,
  getPoliticalPolyOption,
};

import { NextFunction, Request, Response } from 'express';
import polynomialService from '../services/polynomial.service';
import { PolynomialCreationAttributes } from '@/db/models/polynomial';
import { PolynomialAttributesOptional } from '@/types';
import { ClientError } from '@/errors';

const createPolynomial = async (req: Request, res: Response, next: NextFunction) => {
  const polynomial: PolynomialCreationAttributes = req.body;
  try {
    const polynomialCreate = await polynomialService.createPolynomialDB(polynomial);
    res.status(201).json(polynomialCreate);
  } catch (error) {
    next(error);
  }
};

const putPolynomial = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const polynomial: PolynomialAttributesOptional = req.body;
  try {
    const polynomialUpdate = await polynomialService.updatePolynomialDB({ ...polynomial, id });
    res.status(200).json(polynomialUpdate);
  } catch (error) {
    next(error);
  }
};

const deletePolynomial = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const polynomialDelete = await polynomialService.deletePolynomialDB({ id });
    res.status(200).json(polynomialDelete);
  } catch (error) {
    next(error);
  }
};

const getPolynomialsId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const polinomial = await polynomialService.getPolynomialsId({ id });
    if (!polinomial) {
      throw new ClientError('No existe ese id de polynomio', 404);
    }
    res.status(200).json(polinomial);
  } catch (error) {
    next(error);
  }
};

const getAllPolynomials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allPolynomials = await polynomialService.getPolynomials();
    res.status(200).json(allPolynomials);
  } catch (error) {
    next(error);
  }
};

export default {
  createPolynomial,
  putPolynomial,
  deletePolynomial,
  getPolynomialsId,
  getAllPolynomials,
};

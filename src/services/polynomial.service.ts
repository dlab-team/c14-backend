import {
  Polynomial,
  PolynomialAttributes,
  PolynomialCreationAttributes,
} from '@/db/models/polynomial';
import { ClientError } from '@/errors';
import { Response } from './user.service';
import { IdPolynomial, PolynomialUpdateService } from '@/types';
import { PolynomialOption } from '@/db/models/polynomial_option';
import { Group } from '@/db/models/group';
import { Phrases } from '@/db/models/phrases';

const createPolynomialDB = (
  polynomial: PolynomialCreationAttributes,
): Promise<PolynomialAttributes> => {
  return Polynomial.create(polynomial, { raw: true }).then(({ id, name, active, political }) => ({
    id,
    name,
    active,
    political,
  }));
};

const updatePolynomialDB = async (
  polynomialUpdate: PolynomialUpdateService,
): Promise<PolynomialAttributes> => {
  const polinomial = await getPolynomialsId(polynomialUpdate);
  if (polinomial) {
    polinomial.update(polynomialUpdate);
    const { id, name, active, political } = polinomial.dataValues;
    const restPolynomial = { id, name, active, political };
    return restPolynomial;
  } else {
    throw new ClientError('El polinomio a actualizar no existe', 404);
  }
};

const deletePolynomialDB = async (idPolynomial: IdPolynomial): Promise<Response> => {
  const polinomial = await getPolynomialsId(idPolynomial);
  if (polinomial) {
    polinomial.destroy();
    return { success: true, message: 'Se elimino correctamente el polinomio' };
  } else {
    throw new ClientError('El polinomio a eliminar no existe', 404);
  }
};

const getPolynomials = () => {
  return Polynomial.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Group,
        include: [
          { model: Group, attributes: ['name'] },
          { model: Phrases, attributes: ['text'] },
          { model: PolynomialOption, attributes: ['name'] },
        ],
        attributes: ['name', 'oppositeGroupId'],
      },
    ],
  });
};

const getPolynomialsId = (idPolynomial: IdPolynomial) => {
  return Polynomial.findByPk(idPolynomial.id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
};

const getPoliticalPolyId = async () => {
  const res = await Polynomial.findOne({
    attributes: ['id'],
    where: {
      name: 'Político',
    },
  });
  return res;
};

const polynomialsNotPolitical = () => {
  return Polynomial.findAll({
    where: {
      political: false,
      active: true,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: PolynomialOption,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  });
};

export default {
  createPolynomialDB,
  updatePolynomialDB,
  deletePolynomialDB,
  getPolynomials,
  getPolynomialsId,
  getPoliticalPolyId,
  polynomialsNotPolitical,
};

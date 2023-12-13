import {
  Polynomial,
  PolynomialAttributes,
  PolynomialCreationAttributes,
} from '@/db/models/polynomial';
import { ClientError } from '@/errors';
import { Response } from './user.service';
import { IdPolynomial, PolynomialAttributesOptional } from '@/types';

const createPolynomialDB = (
  polynomial: PolynomialCreationAttributes,
): Promise<PolynomialAttributes> => {
  return Polynomial.create(polynomial, { raw: true }).then(({ id, name, active }) => ({
    id,
    name,
    active,
  }));
};

const updatePolynomialDB = async (polynomialUpdate: PolynomialAttributesOptional) => {
  const polinomial = await getPolynomialsId(polynomialUpdate);
  if (polinomial) {
    polinomial.update(polynomialUpdate);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, name, active } = polinomial.dataValues;
    const restPolynomial = { id, name, active };
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
  return Polynomial.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
};

const getPolynomialsId = (idPolynomial: IdPolynomial) => {
  return Polynomial.findByPk(idPolynomial.id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
};

export default {
  createPolynomialDB,
  updatePolynomialDB,
  deletePolynomialDB,
  getPolynomials,
  getPolynomialsId,
};

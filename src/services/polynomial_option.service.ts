import {
  PolynomialOption,
  PolynomialOptionAttributes,
  PolynomialOptionCreationAttributes,
} from '@/db/models/polynomial_option';
import { ClientError } from '@/errors';

const createPolynomialOption = (
  polynomialOption: PolynomialOptionCreationAttributes,
): Promise<PolynomialOptionAttributes> => {
  return PolynomialOption.create(polynomialOption);
};

const updatePolynomialOption = async (
  id: string,
  polynomialOptionUpdate: PolynomialOptionAttributes,
) => {
  const polynomialOption = await getPolynomialOptionId(id);
  const newPolynomias = { ...polynomialOptionUpdate, polynomialOption };
  if (polynomialOption) {
    polynomialOption.update(newPolynomias);
    return polynomialOption;
  } else {
    throw new ClientError('La opcion del polinomio a actualizar no existe', 404);
  }
};

const deletePolynomialOption = async (idPolynomialOption: string) => {
  const polynomialOption = await getPolynomialOptionId(idPolynomialOption);
  if (polynomialOption) {
    polynomialOption.destroy();
    return { success: true, message: 'Se elimino correctamente la opcion del polinomio' };
  } else {
    throw new ClientError('La opcion del polinomio a eliminar no existe', 404);
  }
};

const getPolynomialOptions = () => {
  return PolynomialOption.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
};

const getPolynomialOptionId = (idPolynomialOption: string) => {
  return PolynomialOption.findByPk(idPolynomialOption, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
};

export default {
  createPolynomialOption,
  getPolynomialOptionId,
  updatePolynomialOption,
  deletePolynomialOption,
  getPolynomialOptions,
};

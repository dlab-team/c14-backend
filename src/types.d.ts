import { PolynomialAttributes } from './db/models/polynomial';
import { PolynomialOptionAttributes } from './db/models/polynomial_option';

//tipos de JWT
export interface Payload {
  id: string;
  email: string;
}

// tipos de servicios y controlador de usuarios
export type UserResLogin = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  token: string;
};

// tipos de servicios y controlador de polinomios
export type PolynomialAttributesOptional = PolynomialAttributes & {
  name?: string;
  active?: boolean;
};
export type IdPolynomial = Pick<PolynomialAttributes, 'id'>;

export type IdPolynomialOption = Pick<PolynomialOptionAttributes, 'id'>;

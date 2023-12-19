import { PolynomialAttributes } from './db/models/polynomial';

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
export type PolynomialAttributesOptional = Omit<PolynomialAttributes, 'id'> & {
  name?: string;
  active?: boolean;
};
export type IdPolynomial = Pick<PolynomialAttributes, 'id'>;

export interface PolynomialUpdateService extends Pick<PolynomialAttributes, 'id'> {
  name?: string;
  active?: boolean;
}

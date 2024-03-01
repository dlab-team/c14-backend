import { PolynomialAttributes } from './db/models/polynomial';
import { PolynomialOptionAttributes } from './db/models/polynomial_option';
import { PhrasesAttributes } from './db/models/phrases';
import { SurveyResponseAttributes } from './db/models/survey_response';
import { SurveyResponseProfileAttributes } from './db/models/survey_response_profile';
import { SurveyResultAttributes } from './db/models/survey_result';

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
export type IdPolynomialOption = Pick<PolynomialOptionAttributes, 'id'>;

export interface PolynomialUpdateService extends Pick<PolynomialAttributes, 'id'> {
  name?: string;
  active?: boolean;
}

// tipos de servicios y controlador de phrases
export type PhrasesAttributesOptional = Omit<PhrasesAttributes, 'id'> & {
  text?: string;
  polynomialId?: string;
};
export type IdPhrases = Pick<PhrasesAttributes, 'id'>;

export type PhrasesUpdateService = Omit<PhrasesAttributes, 'id' | 'polynomialId'> & {
  text?: string;
  neutral?: boolean;
  survey_results: SurveyResultAttributes[];
};

export interface IdsSocials {
  ids: string[];
}

//survey
export interface SurveyResponseCharacter
  extends Pick<SurveyResponseAttributes, 'id' | 'finishedSocialForm'> {
  polinomialOptionsId: string[];
}
export interface SurveyProfileCreate extends Omit<SurveyResponseProfileAttributes, 'id'> {}

//result
export interface stringResultAttributes {
  id: string;
  surveyResponseId: string;
  value: string;
  phraseId: string;
}

export interface numberResultAttributes {
  id: string;
  surveyResponseId: string;
  value: number;
  phraseId: string;
}

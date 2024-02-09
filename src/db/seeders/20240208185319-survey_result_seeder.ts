'use strict';

import { QueryInterface } from 'sequelize';
import { faker } from '@faker-js/faker';
import { PolynomialOption } from '../models/polynomial_option';
import { Phrases } from '../models/phrases';
import { SurveyResultAttributes } from '../models/survey_result';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const phrases = await Phrases.findAll({
      attributes: ['id'],
    });
    const polinomialOptions = await PolynomialOption.findAll({
      attributes: ['id'],
    });

    interface SurveyResultInstance extends SurveyResultAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

    const array: SurveyResultInstance[] = [];

    polinomialOptions.forEach(function (polynomialOption) {
      phrases.forEach(function (phrase) {
        const newResults: SurveyResultInstance = {
          phraseId: phrase.id,
          polynomialOptionId: polynomialOption.id,
          percentage: faker.number.float({ min: 0, max: 1 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        array.push(newResults);
      });
    });

    /* const createResults = (array: SurveyResultAttributes[]) => {
      return array.map(result => ({
        result,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    };
    const results = createResults(array);
    console.log(typeof results); */

    await queryInterface.bulkInsert('survey_result', array, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('survey_result', {});
  },
};

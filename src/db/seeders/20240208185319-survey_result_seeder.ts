'use strict';

import { QueryInterface } from 'sequelize';
import { faker } from '@faker-js/faker';
import { PolynomialOption } from '../models/polynomial_option';
import { Phrases } from '../models/phrases';
import { SurveyResultAttributes } from '../models/survey_result';
import { Polynomial } from '../models/polynomial';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const polynomials = await Polynomial.findAll({
      attributes: ['id'],
    });

    interface SurveyResultInstance extends SurveyResultAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

    const data: SurveyResultInstance[] = [];

    for (let i = 0; i < polynomials.length; i++) {
      const e = polynomials[i];
      const phrases = await Phrases.findAll({
        attributes: ['id'],
        where: { polynomialId: e.id },
      });
      const polinomialOptions = await PolynomialOption.findAll({
        attributes: ['id'],
        where: { polynomialId: e.id },
      });
      const results = polinomialOptions
        .map(opt => {
          return phrases.map(function (phrase) {
            const newResults: SurveyResultInstance = {
              phraseId: phrase.id,
              polynomialOptionId: opt.id,
              percentage: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            return newResults;
          });
        })
        .flat();

      data.push(...results);
    }

    await queryInterface.bulkInsert('survey_result', data, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('survey_result', {});
  },
};

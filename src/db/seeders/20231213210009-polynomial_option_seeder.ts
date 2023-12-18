'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const polynomialIdTable = await queryInterface.sequelize.query('SELECT id from polynomial;');

    const polynomialOptions = polynomialIdTable[0].map((polynomial: any) => ({
      id: uuidv4(),
      name: faker.lorem.sentence(),
      group: faker.helpers.arrayElement(['Extremo1', 'Extremo2', 'Neutro']),
      polynomialId: polynomial.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('polynomial_option', polynomialOptions, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('polynomial_option', {});
  },
};

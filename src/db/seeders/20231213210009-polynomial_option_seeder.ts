'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const polynomialIdTable = await queryInterface.sequelize.query('SELECT id from polynomials;');

    /*     for (let i = 0; i < polynomialIdTable[0].length; i++) {
      const polynomialOptions = {
        id: uuidv4(),
        name: faker.lorem.sentence(),
        group: faker.helpers.arrayElement(['Extremo1', 'Extremo2', 'Neutro']),
        polynomialId: polynomialIdTable[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      }; */

    const polynomialOption = Array.from({ length: polynomialIdTable[0].length }, (v, i) => ({
      id: uuidv4(),
      name: faker.lorem.sentence(),
      group: faker.helpers.arrayElement(['Extremo1', 'Extremo2', 'Neutro']),
      polynomialId: polynomialIdTable[i],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('polynomial_options', polynomialOption);
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('polynomial_options', {});
  },
};

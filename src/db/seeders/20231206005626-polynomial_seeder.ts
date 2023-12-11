'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // If 'length' is changed, the number of created polynomials changes
    const polynomials = Array.from({ length: 10 }, () => ({
      id: uuidv4(),
      name: faker.lorem.sentence(),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('polynomials', polynomials, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('polynomials', {});
  },
};

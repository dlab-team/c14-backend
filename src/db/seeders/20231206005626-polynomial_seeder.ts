/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async queryInterface => {

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

  down: async queryInterface => {
    await queryInterface.bulkDelete('polynomials', null, {});
  },
};

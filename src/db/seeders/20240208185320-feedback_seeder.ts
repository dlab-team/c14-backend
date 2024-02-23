'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
 import { faker } from '@faker-js/faker';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
   

     const feedbacks = Array.from({ length: 10 }, () => ({
       id: uuidv4(),
       feedback: faker.lorem.paragraph(),
       rating: faker.number.int({ min: 1, max: 5 }),
       createdAt: new Date(),
       updatedAt: new Date(),
    }));


    await queryInterface.bulkInsert('feedback', feedbacks, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('feedback', {});
  },
};

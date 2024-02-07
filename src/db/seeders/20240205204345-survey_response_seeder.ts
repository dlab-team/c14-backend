'use strict';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // If 'length' is changed, the number of created survey_responses changes
    const unfinishedSurveyResponses = Array.from({ length: 5 }, () => ({
      id: uuidv4(),
      os: faker.helpers.arrayElement(['Windows', 'macOS', 'Linux']),
      country: faker.location.country(),
      region: faker.lorem.word(),
      city: faker.location.city(),
      startDate: new Date(),
      finishedSocialForm: true,
      duration: faker.number.float({ min: 1, max: 10 }),
    }));
    const finihsedSurveyResponses = Array.from({ length: 5 }, () => ({
      id: uuidv4(),
      os: faker.helpers.arrayElement(['Windows', 'macOS', 'Linux']),
      country: faker.location.country(),
      region: faker.lorem.word(),
      city: faker.location.city(),
      startDate: new Date(),
      finishDate: new Date(),
      finishedSocialForm: true,
      duration: faker.number.float({ min: 1, max: 10 }),
    }));

    await queryInterface.bulkInsert(
      'survey_response',
      unfinishedSurveyResponses.concat(finihsedSurveyResponses),
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('survey_response', {});
  },
};

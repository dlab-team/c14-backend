'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
// import { faker } from '@faker-js/faker';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // // If 'length' is changed, the number of created polynomials changes
    // const polynomials = Array.from({ length: 10 }, () => ({
    //   id: uuidv4(),
    //   name: faker.lorem.sentence(),
    //   political: faker.helpers.arrayElement([true, false]),
    //   active: true,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }));
    const data: string[] = [
      'Político',
      'Género',
      'Regiones',
      'Ingresos',
      'Pueblos indígenas',
      'Credo',
      ' Inmigración',
      'Directivo',
      'Etario',
      'Orientación Sexual',
    ];
    const polynomials = data.map(polynomialName => {
      const newPolynomial = {
        id: uuidv4(),
        name: polynomialName,
        political: polynomialName === 'Político' ? true : false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return newPolynomial;
    });

    await queryInterface.bulkInsert('polynomial', polynomials, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('polynomial', {});
  },
};

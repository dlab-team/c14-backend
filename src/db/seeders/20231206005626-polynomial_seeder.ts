'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export const polynomialsData: string[] = [
  'Político',
  'Género',
  'Regiones',
  'Ingresos',
  'Pueblos indígenas',
  'Credo',
  'Inmigración',
  'Directivo',
  'Etario',
  'Orientación sexual',
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const polynomials = polynomialsData.map(polynomialName => {
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

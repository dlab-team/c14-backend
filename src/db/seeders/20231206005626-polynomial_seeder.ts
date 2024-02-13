'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
// import { faker } from '@faker-js/faker';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // If 'length' is changed, the number of created polynomials changes
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
      'Inmigración',
      'Directivo',
      'Etario',
      'Orientación sexual',
    ];

    const dataQuestions: string[] = [
      '¿Con quién te identificas?',
      '¿Con qué Género te identificas?',
      '¿En qué Región resides?',
      'En qué rango de ingresos te clasificas?',
      '¿Perteneces a un pueblo indígena?',
      '¿Con qué credo te identificas?',
      '¿Cual es tu estado actual?',
      '¿En qué grupo laboral te clasificas?',
      '¿A que grupo etario perteneces?',
      '¿Cual es tu orientación sexual?',
    ]
    const polynomials = data.map((polynomialName, index) => {
      const newPolynomial = {
        id: uuidv4(),
        name: polynomialName,
        political: polynomialName === 'Político' ? true : false,
        question: dataQuestions[index],
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

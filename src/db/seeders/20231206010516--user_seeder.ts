/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const { v4: uuidv4 } = require('uuid');

// The same password is set for all of them. 
module.exports = {
  up: async queryInterface => {
    // If 'length' is changed, the number of created members changes
    const users = [
      {
        id: uuidv4(),
        firstName: '3xi',
        lastName: 'ONG',
        email: '3xi@g3xi.com',
        password: 'pass123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Leonardo',
        lastName: 'Davinci',
        email: 'LeonardoDa@hotmail.com',
        password: 'pass123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),

        firstName: 'Michelangelo',
        lastName: 'Buonarroti',
        email: 'mbuonarroti@gmail.com',
        password: 'pass123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Rafael',
        lastName: 'Sanzio',
        email: 'Sanzio.e@painter.com',
        password: 'pass123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Giancarlo',
        lastName: 'Noseda',
        email: 'g.noseda.soto@gmail.com',
        password: 'pass123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('user', users, {});
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('user', null, {});
  },
};

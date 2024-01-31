'use strict';

import { hashText } from '@/helpers';
import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const password = await hashText('pass123');
    const users = [
      {
        id: uuidv4(),
        firstName: '3xi',
        lastName: 'ONG',
        email: '3xi@g3xi.com',
        password,
        active: true,
        superAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Leonardo',
        lastName: 'Davinci',
        email: 'leonardo@yopmail.com',
        password,
        active: true,
        superAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Michelangelo',
        lastName: 'Buonarroti',
        email: 'mbuonarroti@yopmail.com',
        password,
        active: true,
        superAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Rafael',
        lastName: 'Sanzio',
        email: 'sanzio.e@yopmail.com',
        password,
        active: true,
        superAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Giancarlo',
        lastName: 'Noseda',
        email: 'g.noseda.soto@gmail.com',
        password,
        active: true,
        superAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('user', users, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('user', {});
  },
};

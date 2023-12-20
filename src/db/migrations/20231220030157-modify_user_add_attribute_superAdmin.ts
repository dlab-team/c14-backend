'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize').Sequelize} */

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await Promise.all([
      queryInterface.addColumn('user', 'superAdmin', {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
    ]);
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('user');
  },
};

'use strict';


/** @type {import('sequelize').Sequelize} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('user', 'superAdmin', {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};

'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('survey_response', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      os: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      country: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      region: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      city: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      finishedSocialForm: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      finishDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('survey_responses');
  },
};

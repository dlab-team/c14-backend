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
        allowNull: true,
        type: DataTypes.TEXT,
      },
      country: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      region: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      city: {
        allowNull: true,
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
        allowNull: true,
        type: Sequelize.DATE,
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      politicalAvg: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      socialAvg: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('survey_responses');
  },
};

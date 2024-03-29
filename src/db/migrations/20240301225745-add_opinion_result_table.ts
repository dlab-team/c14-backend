'use strict';

import { DataTypes, QueryInterface } from 'sequelize';
import { responses } from '@/enums';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('result_opinion', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      surveyResponseId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'survey_response',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      value: {
        type: DataTypes.ENUM(...responses),
        allowNull: false,
      },
      phraseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'phrases',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('result_opinion');
  },
};

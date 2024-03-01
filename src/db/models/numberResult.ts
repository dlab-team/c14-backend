import { DataTypes, Optional, Model } from 'sequelize';
import { sequelize } from '.';
import { numberResultAttributes } from '@/types';

export interface numberResultCreate extends Optional<numberResultAttributes, 'id'> {}

interface numberResultInstance
  extends Model<numberResultAttributes, numberResultCreate>,
    numberResultAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const NumberResult = sequelize.define<numberResultInstance>(
  'number_result',
  {
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
      type: DataTypes.FLOAT,
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
  },
  {
    tableName: 'number_result',
  },
);

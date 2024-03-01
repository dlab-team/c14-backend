import { DataTypes, Optional, Model } from 'sequelize';
import { sequelize } from '.';
import { stringResultAttributes } from '@/types';
import { responses } from '@/enums';

export interface stringResultCreate extends Optional<stringResultAttributes, 'id'> {}

interface stringResultInstance
  extends Model<stringResultAttributes, stringResultCreate>,
    stringResultAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const NumberResult = sequelize.define<stringResultInstance>(
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
  },
  {
    tableName: 'number_result',
  },
);

import { DataTypes, Optional, Model } from 'sequelize';
import { sequelize } from '.';
import { SubjectiveResultAttributes } from '@/types';
import { SurveyResponse } from './survey_response';
import { Phrases } from './phrases';

export interface SubjectiveResultCreate extends Optional<SubjectiveResultAttributes, 'id'> {}

interface SubjectiveResultInstance
  extends Model<SubjectiveResultAttributes, SubjectiveResultCreate>,
    SubjectiveResultAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const SubjectiveResult = sequelize.define<SubjectiveResultInstance>(
  'subjective_result',
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
      type: DataTypes.SMALLINT,
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
    tableName: 'subjective_result',
  },
);

SurveyResponse.hasMany(SubjectiveResult, { foreignKey: 'surveyResponseId' });
SubjectiveResult.belongsTo(SurveyResponse, { foreignKey: 'surveyResponseId' });
Phrases.hasMany(SubjectiveResult, { foreignKey: 'phraseId' });
SubjectiveResult.belongsTo(Phrases, { foreignKey: 'phraseId' });

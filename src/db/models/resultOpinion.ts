import { DataTypes, Optional, Model } from 'sequelize';
import { sequelize } from '.';
import { ResultOpinionAttributes } from '@/types';
import { responses } from '@/enums';
import { SurveyResponse } from './survey_response';
import { Phrases } from './phrases';

export interface ResultOpinionCreate extends Optional<ResultOpinionAttributes, 'id'> {}

interface ResultOpinionInstace
  extends Model<ResultOpinionAttributes, ResultOpinionCreate>,
    ResultOpinionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const ResultOpinion = sequelize.define<ResultOpinionInstace>(
  'result_opinion',
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
    tableName: 'result_opinion',
  },
);

SurveyResponse.hasMany(ResultOpinion, { foreignKey: 'surveyResponseId' });
ResultOpinion.belongsTo(SurveyResponse, { foreignKey: 'surveyResponseId' });
Phrases.hasMany(ResultOpinion, { foreignKey: 'phraseId' });
ResultOpinion.belongsTo(Phrases, { foreignKey: 'phraseId' });

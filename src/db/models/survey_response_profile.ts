import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import { SurveyResponse } from './survey_response';
import { PolynomialOption } from './polynomial_option';

export interface SurveyResponseProfileAttributes {
  id: string;
  surveyResponseId: string;
  polynomialOptionId: string;
}

export interface SurveyResponseProfileInstance
  extends Model<SurveyResponseProfileAttributes>,
    SurveyResponseProfileAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const SurveyResponseProfile = sequelize.define<SurveyResponseProfileInstance>(
  'survey_response_profile',
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
    polynomialOptionId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'polynomial_option',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'survey_response_profile',
  },
);

SurveyResponseProfile.belongsTo(SurveyResponse, { foreignKey: 'surveyResponseId' });
SurveyResponseProfile.belongsTo(PolynomialOption, { foreignKey: 'polynomialOptionId' });

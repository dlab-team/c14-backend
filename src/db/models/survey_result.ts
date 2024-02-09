import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import { PolynomialOption } from './polynomial_option';
import { Phrases } from './phrases';

export interface SurveyResultAttributes {
  phraseId: string;
  polynomialOptionId: string;
  percentage: number;
}

export interface SurveyResultInstance
  extends Model<SurveyResultAttributes>,
    SurveyResultAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const SurveyResult = sequelize.define<SurveyResultInstance>(
  'survey_result',
  {
    phraseId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      references: {
        model: 'phrases',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    polynomialOptionId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      references: {
        model: 'polynomial_option',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    percentage: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: 'survey_result',
  },
);

PolynomialOption.hasMany(SurveyResult, { foreignKey: 'polynomialOptionId' });
SurveyResult.belongsTo(PolynomialOption, { foreignKey: 'polynomialOptionId' });
Phrases.hasMany(SurveyResult, { foreignKey: 'phraseId' });
SurveyResult.belongsTo(Phrases, { foreignKey: 'phraseId' });

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';

export interface SurveyResponseAttributes {
  id: string;
  createdAt: Date;
  finishDate: Date;
  duration: number;
}

export interface SurveyResponseInstance
  extends Model<SurveyResponseAttributes>,
    SurveyResponseAttributes {
  updatedAt?: Date;
}

export const SurveyResponse = sequelize.define<SurveyResponseInstance>(
  'survey_responses',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    finishDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'survey_responses',
  },
);

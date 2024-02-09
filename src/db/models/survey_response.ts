import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';

export interface SurveyResponseAttributes {
  id: string;
  os: string;
  country: string;
  region: string;
  city: string;
  startDate: Date;
  finishDate?: Date | null;
  finishedSocialForm: boolean;
  duration: number;
}

export interface SurveyResponseInstance
  extends Model<SurveyResponseAttributes>,
    SurveyResponseAttributes {}

export const SurveyResponse = sequelize.define<SurveyResponseInstance>(
  'survey_response',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    finishDate: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'survey_response',
  },
);

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface SurveyResponseAttributes {
  id: string;
  os?: string;
  country?: string;
  region?: string;
  city?: string;
  politicalAvg?: number;
  socialAvg?: number;
  startDate: Date;
  finishDate?: Date | null;
  finishedSocialForm: boolean;
  duration: number;
}

export interface SurveyResponseCreationAttributes
  extends Optional<SurveyResponseAttributes, 'id' | 'finishDate'> {}
export interface SurveyResponseInstance
  extends Model<SurveyResponseAttributes, SurveyResponseCreationAttributes>,
    SurveyResponseAttributes {
  label: string;
  total: string;
}

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
    politicalAvg: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    socialAvg: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: 'survey_response',
    timestamps: false,
  },
);

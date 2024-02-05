import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import { Group } from './group';
import { Phrases } from './phrases';

export interface SurveyResultAttributes {
  phraseId: string;
  groupId: string;
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
    groupId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      references: {
        model: 'group',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    percentage: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'survey_result',
  },
);

Group.hasMany(SurveyResult, { foreignKey: 'groupId' });
Phrases.hasMany(SurveyResult, { foreignKey: 'phraseId' });
SurveyResult.belongsTo(Group, { foreignKey: 'groupId' });
SurveyResult.belongsTo(Phrases, { foreignKey: 'phraseId' });

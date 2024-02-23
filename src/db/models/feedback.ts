import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface FeedbackAttributes {
  id: string;
  feedback: string;
  rating: number;
}

export interface FeedbackCreationAttributes extends Optional<FeedbackAttributes, 'id'> {}

export interface FeedbackInstance
  extends Model<FeedbackAttributes, FeedbackCreationAttributes>,
  FeedbackAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Feedback = sequelize.define<FeedbackInstance>(
  'feedback',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    feedback: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      }
    },
  },
  {
    tableName: 'feedback',
  },
);

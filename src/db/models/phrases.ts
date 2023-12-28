import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { Polynomial } from './polynomial';

export interface PhrasesAttributes {
  id: string;
  text: string;
  group: 'Extremo 1' | 'Extremo 2' | 'Neutro';
  polynomial_id: string;
}

export interface PhrasesCreationAttributes extends Optional<PhrasesAttributes, 'id'> {}

interface PhrasesInstance
  extends Model<PhrasesAttributes, PhrasesCreationAttributes>,
    PhrasesAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Phrases = sequelize.define<PhrasesInstance>(
  'phrases',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    text: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    group: {
      allowNull: false,
      type: DataTypes.ENUM('Extremo 1', 'Extremo 2', 'Neutro'),
    },
    polynomial_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      references: {
        model: 'polynomial',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'phrases',
  },
);

Polynomial.hasMany(Phrases, { foreignKey: 'polynomial_id' });
Phrases.belongsTo(Polynomial, { foreignKey: 'polynomial_id' });
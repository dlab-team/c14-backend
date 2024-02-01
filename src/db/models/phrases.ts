import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { Polynomial } from './polynomial';
import { group } from '@/enums';

export interface PhrasesAttributes {
  id: string;
  text: string;
  group: group;
  polynomialId: string;
}

export interface PhrasesCreationAttributes extends Optional<PhrasesAttributes, 'id'> {}

 export interface PhrasesInstance
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
      type: DataTypes.ENUM('Extremo 1', 'Extremo 2'),
    },
    polynomialId: {
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

Polynomial.hasMany(Phrases, { foreignKey: 'polynomialId' });
Phrases.belongsTo(Polynomial, { foreignKey: 'polynomialId' });

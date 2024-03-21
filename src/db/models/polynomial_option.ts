import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { Polynomial } from './polynomial';
import { group } from '@/enums';

export interface PolynomialOptionAttributes {
  id: string;
  name: string;
  group: group | null;
  polynomialId: string;
  color: string;
  description: string;
}

export interface PolynomialOptionCreationAttributes
  extends Optional<PolynomialOptionAttributes, 'id'> {}

export interface PolynomialOptionInstance
  extends Model<PolynomialOptionAttributes, PolynomialOptionCreationAttributes>,
    PolynomialOptionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const PolynomialOption = sequelize.define<PolynomialOptionInstance>(
  'polynomial_option',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    group: {
      allowNull: true,
      type: DataTypes.ENUM('Extremo 1', 'Extremo 2'),
    },
    polynomialId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'polynomial',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'polynomial_option',
  },
);

Polynomial.hasMany(PolynomialOption, { foreignKey: 'polynomialId' });
PolynomialOption.belongsTo(Polynomial, { foreignKey: 'polynomialId' });

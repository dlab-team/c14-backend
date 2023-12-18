import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { Polynomial } from './polynomial';

export interface PolynomialOptionAttributes {
  id: string;
  name: string;
  group: Array<string>;
  polynomialId: string;
}

export interface PolynomialOptionCreationAttributes
  extends Optional<PolynomialOptionAttributes, 'id'> {}

export interface PolynomialOptionInstance
  extends Model<PolynomialOptionAttributes, PolynomialOptionCreationAttributes>,
    PolynomialOptionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export enum groups {
  'Extremo1',
  'Extremo2',
  'Neutro',
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
      allowNull: false,
      type: DataTypes.ENUM({ values: Object.keys(groups) }),
      defaultValue: groups.Extremo1,
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
  },
  {
    tableName: 'polynomial_option',
  },
);

Polynomial.hasMany(PolynomialOption, { foreignKey: 'polynomialId' });
PolynomialOption.belongsTo(Polynomial, { foreignKey: 'polynomialId' });

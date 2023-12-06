import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface PolynomialAttributes {
  id: string;
  name: string;
  active: boolean;
}

interface PolynomialCreationAttributes extends Optional<PolynomialAttributes, 'id'> {}

interface PolynomialInstance extends Model<PolynomialAttributes, PolynomialCreationAttributes>, PolynomialAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Polynomial = sequelize.define<PolynomialInstance>(
  'polynomial',
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
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'polynomials',
  },
);
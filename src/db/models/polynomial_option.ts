import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { Group } from './group';

export interface PolynomialOptionAttributes {
  id: string;
  name: string;
  groupId: string;
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
    groupId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'groups',
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

Group.hasMany(PolynomialOption, { foreignKey: 'groupId' });
PolynomialOption.belongsTo(Group, { foreignKey: 'groupId' });

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { Polynomial } from './polynomial';

export interface GroupAttributes {
  id: string;
  name: string;
  oppositeGroupId?: string;
  polynomialId: string;
}

export interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

export interface GroupInstance
  extends Model<GroupAttributes, GroupCreationAttributes>,
    GroupAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Group = sequelize.define<GroupInstance>(
  'groups',
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
    oppositeGroupId: {
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: 'groups',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
    tableName: 'groups',
  },
);

Polynomial.hasMany(Group, { foreignKey: 'polynomialId' });
Group.belongsTo(Polynomial, { foreignKey: 'polynomialId' });
Group.hasOne(Group, { foreignKey: 'oppositeGroupId' });
Group.belongsTo(Group, { foreignKey: 'oppositeGroupId' });

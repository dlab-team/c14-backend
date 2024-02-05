import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { Group } from './group';

export interface PhrasesAttributes {
  id: string;
  text: string;
  groupId: string;
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
    groupId: {
      allowNull: false,
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
  },
  {
    tableName: 'phrases',
  },
);

Group.hasMany(Phrases, { foreignKey: 'groupId' });
Phrases.belongsTo(Group, { foreignKey: 'groupId' });

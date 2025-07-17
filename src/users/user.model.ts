import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../config/dataBase";
import { IUser } from "../types/user.interface";

export class User extends Model<IUser> implements IUser {
  public id?: number;
  public email?: string;
  public password?: string;
  public name?: string;
  public phone?: string;
  public role?: "customer" | "admin" | "seller";
  public active?: number;
  public avatarUrl?: string;
  public lastLogin?: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: DataTypes.STRING,

    role: {
      type: DataTypes.ENUM("customer", "admin", "seller"),
      defaultValue: "customer",
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    avatarUrl: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;

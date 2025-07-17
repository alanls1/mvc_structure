import { DataTypes } from "sequelize";
import sequelize from "../../config/dataBase";

const User = sequelize.define("user", {
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
});

export default User;

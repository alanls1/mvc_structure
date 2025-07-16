import { DataTypes } from "sequelize";
import sequelize from "../../config/dataBase";

const Tags = sequelize.define("Tag", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Tags;

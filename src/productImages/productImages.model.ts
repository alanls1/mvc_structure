import { DataTypes } from "sequelize";
import sequelize from "../../config/dataBase";

const ProductImage = sequelize.define("ProductImage", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("image", "video", "audio", "file"),
    allowNull: false,
  },
});

export default ProductImage;

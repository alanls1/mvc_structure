import { DataTypes } from "sequelize";
import sequelize from "../../config/dataBase";
import ProductImage from "../productImages/productImages.model";
import Tags from "../tags/tags.model";
import Category from "../categories/categories.model";

const Products = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
});

Products.hasMany(ProductImage, {
  foreignKey: "productId",
  as: "images",
});

ProductImage.belongsTo(Products, {
  foreignKey: "productId",
});

Products.belongsToMany(Tags, {
  through: "product_tags",
  as: "tags",
  foreignKey: "productId",
});

Tags.belongsToMany(Products, {
  through: "product_tags",
  as: "products",
  foreignKey: "tagId",
});

Products.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Category.hasMany(Products, {
  foreignKey: "categoryId",
  as: "products",
});

export default Products;

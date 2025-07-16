import { Sequelize } from "sequelize";
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE!,
  process.env.USERNAME!,
  process.env.PASSWORD!,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize;

import { Sequelize } from "sequelize";
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE!,
  process.env.DATABASE_USERNAME!,
  process.env.PASSWORD!,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

async function connection() {
  try {
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default sequelize;
export { connection };

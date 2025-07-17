import "reflect-metadata";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connection } from "./config/dataBase";
import { errorMiddleware } from "./src/middleware/error.middleware";
import products from "./src/products/product.routes";
import user from "./src/users/user.routes";

require("dotenv").config();

const app = express();

connection();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/products", products);
app.use("/users", user);

app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("API está rodando!");
});

const PORT = process.env.PORT || 3000!;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

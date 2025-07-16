import { Request, Response } from "express";
import { findAll } from "./product.service";

export async function getAllProducts(req: Request, res: Response) {
  const products = await findAll();
  res.json(products);
}

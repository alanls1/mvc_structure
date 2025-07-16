import { Router } from "express";
import { getAllProducts } from "./categories.controller";

const router = Router();

router.get("/", getAllProducts);

export default router;

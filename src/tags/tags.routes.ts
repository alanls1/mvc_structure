import { Router } from "express";
import { getAllProducts } from "./tags.controller";

const router = Router();

router.get("/", getAllProducts);

export default router;

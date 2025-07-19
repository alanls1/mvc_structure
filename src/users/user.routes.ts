import { Router } from "express";
import * as controller from "./user.controller";
import { authentication } from "../middleware/authentication.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";

const router = Router();

router.post("/login", controller.login);
router.post("/", authentication, isAdmin, controller.createUser);
router.post("/refreshToken", controller.refreshToken);
export default router;

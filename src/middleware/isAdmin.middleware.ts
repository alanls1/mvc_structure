import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/user.interface";

export function isAdmin(req: CustomRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Acesso negado: requer permissoes de administrador" });
  } else {
    next();
  }
}

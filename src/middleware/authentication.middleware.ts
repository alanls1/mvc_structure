import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const error = new Error("Não autorizado");
    (error as any).status = 401;
    return next(error);
  }

  const token = authHeader.split("  ")[1];

  jwt.verify(token!, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      const error = new Error("Token inválido ou expirado");
      (error as any).status = 401;
      return next(error);
    }
    (req as any).user = decoded;

    next();
  });
}

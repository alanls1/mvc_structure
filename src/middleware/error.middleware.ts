import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Erro capturado: ", err);

  const status = err.status || 500;
  const message = err.message || "Erro interno no servidor";

  res.status(status).json({
    message,
    error: err.stack || undefined,
  });
}

import { NextFunction, Request, Response } from "express";
import * as service from "./user.service";
import { plainToInstance } from "class-transformer";
import { CreateUserDTO, loginDTO } from "./user.dto";
import { validate } from "class-validator";

export async function createUser(req: Request, res: Response) {
  const dto = plainToInstance(CreateUserDTO, req.body);
  const errors = await validate(dto);

  //Se tiver erros retorna
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  //Se tudo estiver ok, passa o dto para o service
  const user = await service.create(dto);
  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const dto = plainToInstance(loginDTO, req.body);
  const errors = await validate(dto);

  //Se tiver erros retorna
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }
  const ip_address =
    req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const user_agent = req.headers["user-agent"] || "";

  //Se tudo estiver ok, passa o dto para o service
  const token = await service.login(dto, {
    ip_address: ip_address as string,
    user_agent,
  });
  res.status(200).json(token);
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.body;

  //Se tudo estiver ok, passa o dto para o service
  const newToken = await service.refreshToken(token.refreshToken);
  res.json(newToken);
}

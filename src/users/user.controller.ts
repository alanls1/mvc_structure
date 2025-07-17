import { Request, Response } from "express";
import { create } from "./user.service";
import { plainToInstance } from "class-transformer";
import { CreateUserDTO } from "./user.dto";
import { validate } from "class-validator";

export async function createUser(req: Request, res: Response) {
  const dto = plainToInstance(CreateUserDTO, req.body);
  console.log("Dto: ", dto);
  const errors = await validate(dto);

  //Se tiver erros retorna
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  //Se tudo estiver ok, passa o dto para o service
  const user = await create();
  res.json(user);
}

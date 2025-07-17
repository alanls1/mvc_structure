import { loginDTO } from "./user.dto";
import User from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { user_refresh_tokens } from "../model/user_refresh_token.model";

export function create() {
  return User.create({});
}

export async function login(
  { email, password }: loginDTO,
  meta?: { ip_address?: string; user_agent?: string }
) {
  const user = await User.findOne({
    where: { email },
    attributes: ["id", "email", "password"],
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isSamePassword = await bcrypt.compare(password, user.password!);

  if (!isSamePassword) {
    throw new Error("Email/Senha incorreto");
  }

  const accessToken = jwt.sign(
    { email: user.email, id: user.id }, // payload
    process.env.JWT_SECRET!, // chave secreta
    { expiresIn: "15m" } // tempo de expiração
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECURE!,
    { expiresIn: "7d" }
  );

  const hashRefreshToken = await bcrypt.hash(refreshToken, 16);
  const expires_at = new Date();
  expires_at.setDate(expires_at.getDate() + 7);

  await user_refresh_tokens.create({
    id_user: user.id,
    refresh_token: hashRefreshToken,
    uid_user_refresh_token: uuidv4(),
    expires_at,
    ip_address: meta?.ip_address,
    user_agent: meta?.user_agent,
  });

  user.lastLogin = new Date();
  user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}

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
    { expiresIn: "15m" }
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

export async function refreshToken(token: string) {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      id: number;
    };
  } catch (err) {
    throw new Error("Refresh token inválido ou expirado");
  }

  const allTokens = await user_refresh_tokens.findAll({
    where: { id_user: decoded.id },
  });

  const tokenFound = allTokens.find(
    async (t) => await bcrypt.compare(token, t.refresh_token as string)
  );

  if (!tokenFound) {
    throw new Error("Refresh token inválido");
  }

  if (tokenFound?.expires_at && tokenFound?.expires_at < new Date()) {
    throw new Error("Refresh token expirado");
  }

  const user = await User.findOne({ where: { id: decoded.id } });

  const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  const newRefreshToken = jwt.sign(
    { id: decoded.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" }
  );

  const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 16);
  const expires_at = new Date();
  expires_at.setDate(expires_at.getDate() + 7);

  await tokenFound.update({
    refresh_token: hashedRefreshToken,
    expires_at,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

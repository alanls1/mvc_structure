import { CreateUserDTO, loginDTO } from "../user.dto";
import User from "../user.model";
import { user_refresh_tokens } from "../../model/user_refresh_token.model";
import { create, login } from "../user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../user.model");
jest.mock("bcrypt");
jest.mock("../../model/user_refresh_token.model");
jest.mock("jsonwebtoken");

describe("login", () => {
  it("should return error user not found", async () => {
    const fakeUser = {
      email: "alan@teste.com",
      password: "12345678",
    } as loginDTO;

    (User.findOne as jest.Mock).mockResolvedValue(undefined);

    const meta = { ip_address: "123", user_agent: "123" };

    await expect(login(fakeUser, meta)).rejects.toThrow(
      "Usuário não encontrado"
    );
  });

  it("password/email incorrect", async () => {
    const fakeUser = {
      name: "Alan",
      email: "alan@teste.com",
      phone: "1499999999",
      password: "12345678",
      role: "customer",
    } as CreateUserDTO;
    const meta = { ip_address: "123", user_agent: "123" };

    (User.findOne as jest.Mock).mockResolvedValue(fakeUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(login(fakeUser, meta)).rejects.toThrow(
      "Email/Senha incorreto"
    );
  });

  it("should login successfully and update lastLogin", async () => {
    const fakeUser = {
      email: "alan@teste.com",
      password: "12345678",
    };

    const meta = { ip_address: "123", user_agent: "123" };

    const fakeUserReturn = {
      id: 0,
      name: "Alan",
      email: "alan@teste.com",
      phone: "1499999999",
      password: "12345678",
      role: "customer",
      save: jest.fn(),
      lastLogin: undefined,
    };

    const tokens = {
      accessToken: "123123",
      refreshToken: "456456",
    };

    (User.findOne as jest.Mock).mockResolvedValue(fakeUserReturn);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("123123");
    (user_refresh_tokens.create as jest.Mock).mockResolvedValue(undefined);

    const result = await login(fakeUser, meta);

    // Espera os tokens de volta
    expect(result.accessToken).toBe("123123");
    expect(result.refreshToken).toBe("123123");

    // Espera que o user foi retornado corretamente
    expect(result.user).toEqual({
      id: fakeUserReturn.id,
      email: fakeUserReturn.email,
      name: fakeUserReturn.name,
    });

    // Espera que user.save tenha sido chamado
    expect(fakeUserReturn.save).toHaveBeenCalled();

    // Espera que o lastLogin seja atualizado para um Date
    expect(fakeUserReturn.lastLogin).toBeInstanceOf(Date);
  });
});

describe("create", () => {
  it("should create user with success", async () => {
    const fakeUser = {
      name: "Alan",
      email: "alan@teste.com",
      phone: "1499999999",
      password: "12345678",
      role: "customer",
    } as CreateUserDTO;

    const fakeReturn = {
      id: 2,
      name: "Alan",
      email: "alan@teste.com",
      phone: "1499999999",
      role: "customer",
    };

    (User.findOne as jest.Mock).mockResolvedValue(undefined);
    (User.create as jest.Mock).mockResolvedValue(fakeReturn);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed12345678");

    const user = await create(fakeUser);

    expect(user).toEqual(fakeReturn);
  });

  it("Should return error 'email already created'", async () => {
    const fakeUser = {
      name: "Alan",
      email: "alan@teste.com",
      phone: "1499999999",
      password: "12345678",
      role: "customer",
    } as CreateUserDTO;

    (User.findOne as jest.Mock).mockResolvedValue(fakeUser);

    await expect(create(fakeUser)).rejects.toThrow("Email já cadastrado");
  });
});

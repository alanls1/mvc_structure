import { Request, Response } from "express";
import { createUser, login } from "../user.controller";
import * as service from "../user.service";

jest.mock("../user.model.ts");
jest.mock("../user.service");

describe("login", () => {
  it("should return error 400 if the values are incorrect", async () => {
    const req = {
      body: {},
    } as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));

    const res = { status } as unknown as Response;

    await login(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Dados inválidos" })
    );
  });

  it("Should call service.login and return the object with accessToken, refreshToken and user", async () => {
    const req = {
      body: {
        email: "alan@teste.com",
        password: "12345678",
      },
      ip: "123123",
      headers: {},
    } as Request;

    const fakeResults = {
      accessToken: "123123123",
      refreshToken: "123123123",
      user: {
        id: 1,
        email: "teste@gmail.com",
        name: "teste",
      },
    };

    (service.login as jest.Mock).mockResolvedValue(fakeResults);

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));

    const res = { status } as unknown as Response;

    await login(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(fakeResults);
  });
});

describe("createUser", () => {
  it("should return error 400 if the values are incorrect", async () => {
    const req = {
      body: {},
    } as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));

    const res = { status } as unknown as Response;

    await createUser(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Dados inválidos" })
    );
  });

  it("Should call service.create and return the user created", async () => {
    const req = {
      body: {
        name: "Alan",
        email: "alan@teste.com",
        phone: "1499999999",
        password: "12345678",
        role: "customer",
      },
    } as Request;

    const fakeUser = { id: 1, name: "Alan", email: "alan@email.com" };
    (service.create as jest.Mock).mockResolvedValue(fakeUser);

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));

    const res = { status } as unknown as Response;

    const user = await createUser(req, res);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(fakeUser);
  });
});

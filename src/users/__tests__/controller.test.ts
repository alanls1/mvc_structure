import { Request, Response } from "express";
import { createUser } from "../user.controller";
import * as service from "../user.service";

jest.mock("../user.model.ts");
jest.mock("../user.service");

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
    console.log("user: ", user);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(fakeUser);
  });
});

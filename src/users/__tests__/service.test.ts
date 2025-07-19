import { CreateUserDTO } from "../user.dto";
import User from "../user.model";
import { create } from "../user.service";
import bcrypt from "bcrypt";

jest.mock("../user.model");
jest.mock("bcrypt");

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
});

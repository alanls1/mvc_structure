import { Request } from "express";

export interface IUser {
  id?: number;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  role?: "customer" | "admin" | "seller";
  active?: number;
  avatarUrl?: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomRequest extends Request {
  user?: {
    name?: string;
    role?: string;
  };
}

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

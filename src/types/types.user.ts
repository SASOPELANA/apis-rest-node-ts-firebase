import { Request } from "express";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  products?: string[]; // --> para la referencia de los productos en los user
}

export interface UserTokenPayload {
  id: string;
  email: string;
}

export interface RequestWithUser extends Request {
  user?: UserTokenPayload;
}

export interface AuthBody {
  email: string;
  password: string;
}

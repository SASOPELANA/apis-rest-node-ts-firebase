import { Request } from "express";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
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

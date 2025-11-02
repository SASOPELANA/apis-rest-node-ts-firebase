import dotenv from "dotenv";

dotenv.config();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../model/user.model.js";
import { AuthBody } from "../types/types.user.js";

import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body as AuthBody;

  if (!email || !password) {
    return res
      .status(422)
      .json({ message: "El email y la contraseña son requeridos" });
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return res.status(409).json({ message: "El usuarío/a ya existe." });
  }

  const passwordHash = await bcrypt.hash(password, 6);

  // console.log(email, password, passwordHash);

  const user = await createUser(email, passwordHash);

  if (!user) {
    return res.sendStatus(503);
  }

  res.status(201).json({ id: user.id, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as AuthBody;

  if (!email || !password) {
    return res
      .status(422)
      .json({ message: "El email y la contraseña son requeridos" });
  }

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas." });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    return res.status(401).json({ message: "Credenciales inválidas." });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no esta configurado");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    {
      expiresIn: "1h",
    },
  );

  return res.json({ token });
};

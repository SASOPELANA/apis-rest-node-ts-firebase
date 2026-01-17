import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../model/user.model.js";
import { AuthBody } from "../types/types.user.js";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  // Confiamos en req.body porque el validador ya verificó email, password y unicidad
  const { email, password } = req.body as AuthBody;

  const passwordHash = await bcrypt.hash(password, 6);
  const user = await createUser(email, passwordHash);

  if (!user) return res.sendStatus(503);

  res.status(201).json({ id: user.id, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as AuthBody;

  // Solo buscamos al usuario (la existencia básica del formato email ya se validó)
  const user = await findUserByEmail(email);

  // Mantenemos este check aquí porque es lógica de negocio, no solo de formato
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas." });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Credenciales inválidas." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET no esta configurado");

  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "1h",
  });

  res.json({ token });
};

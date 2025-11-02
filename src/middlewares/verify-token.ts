import dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";
import { RequestWithUser, UserTokenPayload } from "../types/types.user.js";
import { Response, NextFunction } from "express";

export const verifyToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET no esta configurado");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Token no valido" });
    }

    req.user = decoded as UserTokenPayload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token no valido" });
  }
};

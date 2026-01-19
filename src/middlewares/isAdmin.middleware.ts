import dotenv from "dotenv";

dotenv.config();

import { Response, NextFunction } from "express";
import { RequestWithUser } from "../types/types.user.js";

export const isAdmin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "No autenticado.",
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL;

  if (req.user.email !== adminEmail) {
    return res.status(403).json({
      message: "Acceso denegado. Solo administradores.",
    });
  }

  next();
};

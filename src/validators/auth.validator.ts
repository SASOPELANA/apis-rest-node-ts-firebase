import { body, ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AuthBody } from "../types/types.user.js";
import { findUserByEmail } from "../model/user.model.js";

const validateResult = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

type AuthKeys = keyof AuthBody;

export const validateRegister: (ValidationChain | any)[] = [
  body("email" as AuthKeys)
    .isEmail()
    .withMessage("Por favor, introduzca un correo válido.")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await findUserByEmail(email);
      if (user) throw new Error("Este correo ya está registrado.");
      return true;
    }),

  body("password" as AuthKeys)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.",
    ),

  validateResult,
];

// 2. VALIDADOR DE LOGIN (Solo presencia y formato básico)
export const validateLogin: (ValidationChain | any)[] = [
  body("email" as AuthKeys)
    .exists()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Introduce un correo válido"),

  body("password" as AuthKeys)
    .exists()
    .withMessage("La contraseña es requerida")
    .notEmpty()
    .withMessage("Debes introducir tu contraseña"),

  validateResult,
];

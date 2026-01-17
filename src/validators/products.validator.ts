import { Request, Response, NextFunction } from "express";
import { Productos } from "../types/types.products.js";

import { body, param, query, validationResult } from "express-validator";

const validateResult = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  next();
};

type ProductKeys = keyof Productos;

// metodo POST y PUT
// post and put reglas y condicones para create con validator express
export const validateCreateProduct = [
  body("name" as ProductKeys)
    .isString()
    .withMessage("El nombre de ser texto.")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido."),

  body("price" as ProductKeys)
    .isNumeric()
    .withMessage("El precio debe ser un numeró.")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0.")
    .notEmpty()
    .withMessage("El precio es requerido."),

  body("categories" as ProductKeys)
    .isArray({ min: 1 })
    .withMessage("Las categorías deben tener al menos una categoría."),

  body("description" as ProductKeys)
    .isString()
    .withMessage("La descripción debe ser texto.")
    .trim()
    .notEmpty()
    .withMessage("La descripción es requerida."),

  body("image" as ProductKeys)
    .isString()
    .withMessage("La imagen debe ser texto.")
    .trim()
    .notEmpty()
    .withMessage("La url de la imagen es requerida."),

  validateResult,
];

// metodo PATCH
// regla para actualizar un producto parcial con validator express
export const validateUpdatePatchProduct = [
  // poenmos optional para que no sea obligatorio y asi enviar un solo campo
  body("name" as ProductKeys)
    .optional()
    .isString()
    .trim()
    .notEmpty(),

  body("price" as ProductKeys)
    .optional()
    .isNumeric()
    .custom((value) => value > 0),

  body("categories" as ProductKeys)
    .optional()
    .isArray({ min: 1 }),

  body("description" as ProductKeys)
    .optional()
    .isString()
    .trim()
    .notEmpty(),

  body("image" as ProductKeys)
    .optional()
    .isString()
    .trim()
    .notEmpty(),

  // validacion para no enviar body vacio
  body().custom((value, { req }) => {
    if (Object.keys(req.body).length === 0) {
      throw new Error("Debes enviar al menos un campo para actualizar.");
    }
    return true;
  }),

  validateResult,
];

// GET SEARCH
// Regla para buscar un producto por su nombre y categorias con validator express
export const validatorSearchProducts = [
  query("name" as ProductKeys)
    .optional()
    .isString()
    .withMessage("El nombre debe ser texto.")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido."),
  query("categories" as ProductKeys)
    .optional()
    .isArray({ min: 1 })
    .withMessage("Las categorías deben tener al menos una categoría."),

  validateResult,
];

export const validateProductById = [
  param("id" as ProductKeys)
    .isString()
    .withMessage("El id debe ser texto.")
    .trim()
    .notEmpty()
    .withMessage("El id es requerido."),

  validateResult,
];

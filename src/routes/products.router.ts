import { Router } from "express";

import controller from "../controllers/products.controller.js";

import { verifyToken } from "../middlewares/verify-token.js";
import {
  validateCreateProduct,
  validateUpdatePatchProduct,
  validatorSearchProducts,
  validateProductById,
} from "../validators/products.validator.js";

import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = Router();

// get all products and By categories
router.get("/products", controller.getAll);

// buscador dinamico o genéricas de nombre
router.get(
  "/products/search",
  validatorSearchProducts,
  controller.getSearchByName,
);

// get id
router.get("/products/:id", validateProductById, controller.getId);

// post -> create new product
// middlewares -> verifyToken (autenticación) -> validateCreateProduct (validación) -> controller
router.post(
  "/products",
  verifyToken,
  isAdmin,
  validateCreateProduct,
  controller.createProduct,
);

// put -> update product (actualización completa)
router.put(
  "/products/:id",
  verifyToken,
  isAdmin,
  validateProductById,
  validateCreateProduct,
  controller.updateProduct,
);

// patch -> update product -> partial update
router.patch(
  "/products/:id",
  verifyToken,
  isAdmin,
  validateProductById,
  validateUpdatePatchProduct,
  controller.updatePatchProduct,
);

// delete -> delete product
router.delete(
  "/products/:id",
  verifyToken,
  isAdmin,
  validateProductById,
  controller.deleteProduct,
);

export default router;

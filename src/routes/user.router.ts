// INICIO: CAMBIO - Creación del router para el submodulo de productos del usuario
import { Router } from "express";
import {
  addProduct,
  removeProduct,
  getUserProducts,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";

const router = Router();

// Todas estas rutas están protegidas y requieren un token de autenticación
router.post("/user/products", verifyToken, addProduct);
router.delete("/user/products/:productId", verifyToken, removeProduct);
router.get("/user/products", verifyToken, getUserProducts);

export default router;
// FIN: CAMBIO

import { Router } from "express";

import controller from "../controllers/products.controller.js";

import { verifyToken } from "../middlewares/verify-token.js";

const router = Router();

// get all products and By categories
router.get("/products", controller.getAll);

// buscador dinamico o genéricas de nombre
router.get("/products/search", controller.getSearchByName);

// get id
router.get("/products/:id", controller.getId);

// post --> create new product
// middlewares --> verifyToken --> para proteger la ruta
router.post("/products", verifyToken, controller.createProduct);

// put --> update product
router.put("/products/:id", verifyToken, controller.updateProduct);

// patch --> update product --> partial update
router.patch("/products/:id", verifyToken, controller.updatePatchProduct);

// delete --> delete product
router.delete("/products/:id", verifyToken, controller.deleteProduct);

export default router;

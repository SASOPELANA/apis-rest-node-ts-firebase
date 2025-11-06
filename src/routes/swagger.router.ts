import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";

import { Router } from "express";

const router = Router();

// swagger import
import swaggerUI from "swagger-ui-express";

const swaggerDoc = JSON.parse(
  fs.readFileSync(
    path.resolve(process.cwd(), "src/swagger-output.json"),
    "utf-8",
  ),
);

// // swagger --> solo en desarrollo
if (process.env.NODE_ENV === "development") {
  router.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
} else {
  router.use("/doc", (_req, res) => {
    res.status(404).json("404 not found :( ");
  });
}

export default router;

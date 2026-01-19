import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";

// rutas import
import mainRouter from "./src/routes/main.router.js";
import productsRouter from "./src/routes/products.router.js";
// INICIO: CAMBIO - Importar el nuevo router de usuario
import userRouter from "./src/routes/user.router.js";
// FIN: CAMBIO

// import admin
import { ensureAdminExists } from "./src/utils/setup.admin.js";

// middlewares import
import middlewares from "./src/middlewares/not-found.js";

// auth router import
import authRouter from "./src/routes/auth.router.js";

// swagger router import -> solo en desarrollo
import swaggerRouter from "./src/routes/swagger.router.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// swagger --> solo en desarrollo
app.use(swaggerRouter);

app.use("/api/auth", authRouter);

app.use(mainRouter);
app.use("/api", productsRouter);

// ruta de usuario y gestion de id productos
app.use("/api", userRouter);

// middlewares para error
app.use(middlewares.notFount);

app.listen(PORT, async () => {
  await ensureAdminExists();
  console.log(`http://localhost:${PORT}`);
});

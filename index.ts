import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";

// rutas import
import mainRouter from "./src/routes/main.router.js";
import productsRouter from "./src/routes/products.router.js";

// middlewares import
import middlewares from "./src/middlewares/not-found.js";

// auth router import
import authRouter from "./src/routes/auth.router.js";

// swagger import
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "./src/swagger-output.json";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use("/api/auth", authRouter);

app.use(mainRouter);
app.use("/api", productsRouter);

// middlewares para error
app.use(middlewares.notFount);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

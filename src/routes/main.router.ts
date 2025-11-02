import { Router } from "express";
import controller from "../controllers/main.controller.js";

const router = Router();

router.get("/", controller.indexMain);

export default router;

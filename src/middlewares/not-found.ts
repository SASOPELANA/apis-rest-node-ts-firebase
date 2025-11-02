// middlewares para error
import { Request, Response, NextFunction } from "express";

const notFount = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: "Not found" });
};

const mantenimiento = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: "APIS REST en mantenimiento." });
};

const middlewares = {
  notFount,
  mantenimiento,
};

export default middlewares;

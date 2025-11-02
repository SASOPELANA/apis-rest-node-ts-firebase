import { Request, Response } from "express";

const indexMain = (_req: Request, res: Response) => {
  res.json("Bienvenidos/as a mi APIS REST con Node y Typescript.");
};

const index = {
  indexMain,
};

export default index;

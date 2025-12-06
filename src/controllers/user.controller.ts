import { Response } from "express";
import {
  addProductToUser,
  removeProductFromUser,
  findUserById,
} from "../model/user.model.js";
import Model from "../model/products.model.js";
import { RequestWithUser } from "../types/types.user.js";

// GET --> Obtener todos los productos en la lista del usuario
export const getUserProducts = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "No autenticado." });
  }

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const productIds = user.products || [];
    const productsDetails = [];

    for (const productId of productIds) {
      const product = await Model.getProductById(productId);
      if (product) {
        productsDetails.push(product);
      }
    }

    res.status(200).json(productsDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// POST --> un producto a la lista del usuario
export const addProduct = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.id;
  const { productId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "No autenticado." });
  }

  if (!productId) {
    return res
      .status(400)
      .json({ message: "El ID del producto es requerido." });
  }

  const product = await Model.getProductById(productId);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado." });
  }

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (user.products && user.products.includes(productId)) {
      return res
        .status(409)
        .json({ message: "El producto ya está en la lista del usuario." });
    }

    await addProductToUser(userId, productId);
    res
      .status(200)
      .json({ message: "Producto añadido a la lista del usuario." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// DELETE --> Eliminar un producto de la lista del usuario
export const removeProduct = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.id;
  const { productId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: "No autenticado." });
  }

  if (!productId) {
    return res
      .status(400)
      .json({ message: "El ID del producto es requerido." });
  }

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (!user.products || !user.products.includes(productId)) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en la lista del usuario." });
    }

    await removeProductFromUser(userId, productId);
    res
      .status(200)
      .json({ message: "Producto eliminado de la lista del usuario." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

const userController = {
  addProduct,
  removeProduct,
  getUserProducts,
};

export default userController;

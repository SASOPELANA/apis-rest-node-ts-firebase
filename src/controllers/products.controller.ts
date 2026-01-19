import { Request, Response } from "express";
import Model from "../model/products.model.js";
import { Productos } from "../types/types.products.js";

// get all

const getAll = async (req: Request, res: Response) => {
  const categories = req.query.categories as string[];

  if (categories) {
    let productsByCategory = await Model.getProductsByCategory(categories);

    //console.log(productsByCategory.length);

    if (productsByCategory.length === 0) {
      productsByCategory = await Model.getProductsByCategoryLower(categories);

      if (productsByCategory.length === 0) {
        return res.status(404).json({ error: "No se encontraron productos." });
      }
    }

    // nunca se deja dos res en un metodo. si incluye dos o mas se usa return
    return res.json(productsByCategory);
  }
  const response = await Model.getAllProducts();
  res.json(response);
};

// get search --> buscador dinamico por nombre

const getSearchByName = async (req: Request, res: Response) => {
  let name = req.query.name as string;

  if (!name) {
    return res.status(400).json({ error: "El nombre es requerido" });
  }

  let response = await Model.getProductByName(name);

  if (response.length === 0) {
    response = await Model.getProductByNameLower(name.toLowerCase());

    if (response.length === 0) {
      return res.status(404).json({ error: "No se encontraron productos." });
    }
  }

  res.json(response);
};

// get id
const getId = async (req: Request, res: Response) => {
  const id = req.params.id;

  const response = await Model.getProductById(id);

  if (!response) {
    return res.status(404).json({ error: "No existe el producto." });
  }

  res.json(response);
};

// post -> crea un producto
const createProduct = async (req: Request, res: Response) => {
  try {
    // Confiamos en express-validator, que ya validó todos los campos
    const { name, price, description, categories, image } =
      req.body as Productos;

    const response = await Model.createProduct({
      name,
      name_lower: name.toLowerCase(),
      price,
      description,
      description_lower: description?.toLowerCase(),
      categories,
      categories_lower: categories.map((item) => item.toLowerCase()),
      image,
      createdAt: new Date().toISOString(), // Timestamp de creación
    });

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto." });
  }
};

// put -> update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Confiamos en express-validator, que ya validó todos los campos
    const { name, price, categories, description, image } =
      req.body as Productos;

    const response = await Model.updateProduct(id, {
      name,
      name_lower: name.toLowerCase(),
      price,
      categories,
      categories_lower: categories.map((item) => item.toLowerCase()),
      description,
      description_lower: description?.toLowerCase(),
      image,
      updatedAt: new Date().toISOString(), // Timestamp de actualización
    });

    if (!response) {
      return res.status(404).json({ error: "No existe el producto." });
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto." });
  }
};

// patch -> actualiza un producto
const updatePatchProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Confiamos en express-validator, que ya validó los campos presentes
    const data = {} as Productos;

    if (req.body.name !== undefined) {
      data.name = req.body.name;
      data.name_lower = req.body.name.toLowerCase();
    }

    if (req.body.price !== undefined) {
      data.price = req.body.price;
    }

    if (req.body.categories !== undefined) {
      data.categories = req.body.categories;
      data.categories_lower = req.body.categories.map((item: string) =>
        item.toLowerCase(),
      );
    }

    if (req.body.description !== undefined) {
      data.description = req.body.description;
      data.description_lower = req.body.description.toLowerCase();
    }

    if (req.body.image !== undefined) {
      data.image = req.body.image;
    }

    // Agregar updatedAt siempre que se actualice
    data.updatedAt = new Date().toISOString();

    const response = await Model.updatePatchProduct(id, data);

    if (!response) {
      return res.status(404).json({ error: "No existe el producto." });
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto." });
  }
};

// delete --> borra un producto
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const response = await Model.deleteProduct(id);

  if (!response) {
    return res.status(404).json({ error: "No existe el producto." });
  }

  res.status(204).json(response);
};

// creamos un objeto para los endpoints
const productsController = {
  getAll,
  getSearchByName,
  getId,
  createProduct,
  updateProduct,
  updatePatchProduct,
  deleteProduct,
};

export default productsController;

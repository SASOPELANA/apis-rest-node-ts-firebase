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

// post --> crea un producto
const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, categories, image } = req.body as Productos;

  if (!name || !price || !description || !categories || !image) {
    return res.status(422).json({
      error:
        "Nombre, precio, categorías, descripcion y la imagen son requeridas.",
    });
  }

  // validación
  // 1. validamos nombre | debe ser texto
  if (!name) {
    return res.status(400).json({ error: "El nombre es requerido" });
  }

  if (typeof name !== "string") {
    return res.status(400).json({ error: "El nombre debe ser texto" });
  }

  // 2. Validarnos precio | debe ser un number | debe ser mayor a 0
  if (!price) {
    return res.status(400).json({ error: "El precio es requerido" });
  }

  if (typeof price !== "number") {
    return res.status(400).json({ error: "El precio debe ser un número" });
  }

  if (price <= 0) {
    return res.status(400).json({ error: "El precio debe ser mayor a 0" });
  }

  // 3. Validamos categorías | debe ser un array | debe tener al menos una categoría
  if (!categories) {
    return res.status(400).json({ error: "Las categorías son requeridas" });
  }

  if (!Array.isArray(categories)) {
    return res
      .status(400)
      .json({ error: "Las categorías deben ser una lista." });
  }

  if (categories.length === 0) {
    return res
      .status(400)
      .json({ error: "Las categorías deben tener al menos una categoría." });
  }

  // 4. Validamos imagen | debe ser un string
  if (!image) {
    return res.status(400).json({ error: "La imagen es requerida" });
  }

  if (typeof image !== "string") {
    return res
      .status(400)
      .json({ error: "La URL de la imagen debe ser un texto." });
  }

  // 5. Validamos la descripcion | debe ser un string (opcional)
  if (description && typeof description !== "string") {
    return res.status(400).json({ error: "La descripcion debe ser un texto." });
  }

  const response = await Model.createProduct({
    name,
    name_lower: name.toLowerCase(),
    price,
    description,
    description_lower: description?.toLowerCase(),
    categories,
    categories_lower: categories.map((item) => item.toLowerCase()),
    image,
  });
  res.status(201).json(response);
};

// put --> update product
const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, price, categories, description, image } = req.body as Productos;

  if (!name || !price || !categories || !description || !image) {
    return res.status(422).json({
      error:
        "Nombre, precio, categorías, descripcion y la imagen son requeridas.",
    });
  }

  if (typeof name !== "string") {
    return res.status(400).json({ error: "El nombre debe ser texto" });
  }

  if (typeof price !== "number") {
    return res.status(400).json({ error: "El precio debe ser un número" });
  }

  if (price <= 0) {
    return res.status(400).json({ error: "El precio debe ser mayor a 0" });
  }

  if (!Array.isArray(categories)) {
    return res
      .status(400)
      .json({ error: "Las categorías deben ser una lista." });
  }

  if (categories.length === 0) {
    return res
      .status(400)
      .json({ error: "Las categorías deben tener al menos una categoría." });
  }

  if (typeof image !== "string") {
    return res
      .status(400)
      .json({ error: "La URL de la imagen debe ser un texto." });
  }

  const response = await Model.updateProduct(id, {
    name,
    name_lower: name.toLowerCase(),
    price,
    categories,
    categories_lower: categories.map((item) => item.toLowerCase()),
    description,
    description_lower: description?.toLowerCase(),
    image,
  });

  if (!response) {
    return res.status(404).json({ error: "No existe el producto." });
  }

  res.json(response);
};

// patch --> actualiza un producto
const updatePatchProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = {} as Productos;

  if (req.body.name !== undefined) {
    if (req.body.name.trim().length === 0) {
      return res.status(400).json({ error: "El nombre no puede estar vacío" });
    }

    data.name = req.body.name;
    data.name_lower = req.body.name.toLowerCase();
  }

  if (req.body.price !== undefined) {
    if (req.body.price <= 0) {
      return res.status(400).json({ error: "El precio debe ser mayor a 0" });
    }

    data.price = req.body.price;
  }

  if (req.body.categories !== undefined) {
    if (req.body.categories.length === 0) {
      return res
        .status(400)
        .json({ error: "Las categorías deben tener al menos una categoría." });
    }

    data.categories = req.body.categories;
    data.categories_lower = req.body.categories.map((item: string) =>
      item.toLowerCase(),
    );
  }

  if (req.body.description !== undefined) {
    if (req.body.description.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "La descripcion no puede estar vacía" });
    }

    data.description = req.body.description;
    data.description_lower = req.body.description.toLowerCase();
  }

  if (req.body.image !== undefined) {
    if (req.body.image.trim().length === 0) {
      return res.status(400).json({
        error: "La URL de la imagen debe ser un texto y no estar vacia.",
      });
    }

    data.image = req.body.image;
  }

  if (Object.keys(data).length === 0) {
    return res.status(422).json({
      error:
        "No se proporcionaron datos para actualizar. Por favor, proporciona al menos un campo para actualizar.",
    });
  }

  const response = await Model.updatePatchProduct(id, data);

  if (!response) {
    return res.status(404).json({ error: "No existe el producto." });
  }

  res.json(response);
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

import { Request, Response } from "express";

import ctrlWrapper from "../utils/ctrlWrapper";

import {
  getAll,
  addItem,
  getById,
  upd,
  deleteById,
  checkIfIdExists,
  addPhotoDB,
  getProductsWithPhoto,
} from "../db-method/products-method";

const getAllProductsCtrl = async (req: Request, res: Response) => {
  const query = `
SELECT products.*, picture.photoUrl, picture.publicId, picture.name
FROM products
LEFT JOIN picture ON products.photo = picture.id;
  `;

  const result = await getProductsWithPhoto(query);

  res.json(result);
};

const createProductCtrl = async (req: Request, res: Response) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: "Must be field image" });
  }

  const query = `
      INSERT INTO products
      (title, description, price, currency, category, bought, discount, weight, ingredients, photo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

  const queryForUpd = `
    UPDATE products
    SET photo = ?
    WHERE id = ?;
  `;

  const product = await addItem(req, res, query, file.path);
  const productId = product?.productInfo.id.toString();

  const photo = await addPhotoDB(file.path, file.filename, file.fieldname);
  const photoId = photo.id;
  const photoIdConverted = photoId !== null ? photoId.toString() : "";

  if (productId !== undefined && photoId !== undefined) {
    const resultUpd = await upd(
      req,
      res,
      queryForUpd,
      productId,
      photoIdConverted
    );
  }

  res.status(200).json({ ...product?.productInfo, photo: photoIdConverted });
};

const getProductByIdCtrl = async (req: Request, res: Response) => {
  const productId = req.params.id;

  const query = `
SELECT products.*, picture.photoUrl, picture.publicId, picture.name
FROM products
LEFT JOIN picture ON products.photo = picture.id
WHERE products.id = ?;

`;
  const result = await getById(req, res, query, productId);
  if (!result) {
    return res.status(404).json({ message: "Product not found." });
  }
  res.json(result);
};

const updProductCtrl = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const fieldToUpdate = Object.keys(req.body)[0];
  const newValue = Object.values(req.body)[0];
  if (newValue === "") {
    return res.status(400).json({ message: "Invalid value." });
  }
  const validFields = [
    "title",
    "description",
    "price",
    "currency",
    "category",
    "bought",
    "photoUrl",
    "publicId",
    "alt",
    "discount",
    "weight",
    "ingredients",
    "photo",
  ];

  if (!validFields.includes(fieldToUpdate)) {
    return res.status(400).json({ message: "Invalid field." });
  }

  const query = `
    UPDATE products
    SET ${fieldToUpdate} = ?
    WHERE id = ?;
  `;
  // потрібно вигадати перевірку для того чи є переданий id в базі )
  const result = await upd(req, res, query, productId, newValue);

  res.json(result);
};

const deleteByIdCtrl = async (req: Request, res: Response) => {
  const productId = req.params.id;

  const query = `
  DELETE FROM picture WHERE id = ? ;
  `;

  try {
    const check = await checkIfIdExists(productId);
    console.log("check: ", check);
    if (!check) {
      res
        .status(400)
        .json({ message: `Error do not exist id: '${productId}'` });
    }
    // await deleteById(query, productId);
    // res.status(200).json({ message: "Product deleted successfully." });

    res.status(401).json({ message: "Test" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product." });
  }
};

const ctrl = {
  getAllProducts: ctrlWrapper({ ctrl: getAllProductsCtrl }),
  getProductById: ctrlWrapper({ ctrl: getProductByIdCtrl }),
  createProduct: ctrlWrapper({ ctrl: createProductCtrl }),
  updProduct: ctrlWrapper({ ctrl: updProductCtrl }),
  deleteById: ctrlWrapper({ ctrl: deleteByIdCtrl }),
};

export default ctrl;

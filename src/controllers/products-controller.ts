import { Router, Request, Response, query } from "express";

import ctrlWrapper from "../utils/ctrlWrapper";
import HttpError from "../helpers/HttpError";
import db from "../db";
import { getAll, addItem } from "../db-method/products-method";

const getAllProductsCtrl = async (req: Request, res: Response) => {
  const query = `SELECT * FROM products`;

  const result = await getAll(req, res, query);

  res.json(result);
};

const createProductCtrl = async (req: Request, res: Response) => {
  console.log("req.body: ", req.body);

  const query = `
      INSERT INTO products
      (title, description, price, currency, category, bought, photoUrl, publicId, alt, discount, weight, ingredients)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

  const result = await addItem(req, res, query, req.body);
  console.log("result: ", result);

  res.json(result);
};

const getProductByIdCtrl = async (req: Request, res: Response) => {};
const ctrl = {
  getAllProducts: ctrlWrapper({ ctrl: getAllProductsCtrl }),
  getProductById: ctrlWrapper({ ctrl: getProductByIdCtrl }),
  createProduct: ctrlWrapper({ ctrl: createProductCtrl }),
};

export default ctrl;

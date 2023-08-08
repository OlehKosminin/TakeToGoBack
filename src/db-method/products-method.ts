import { Router, Request, Response, query } from "express";

import IProduct from "../Interface/IProduct";

import db from "../db";

export const getAll = async (req: Request, res: Response, query: string) => {
  return new Promise<IProduct[]>((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(rows as IProduct[]);
      }
    });
  });
};

export const addItem = async (
  req: Request,
  res: Response,
  query: string,
  reqBody: IProduct
) => {
  const {
    title,
    description,
    price,
    currency,
    category,
    bought,
    photoUrl,
    publicId,
    alt,
    discount,
    weight,
    ingredients,
  } = reqBody;

  try {
    await new Promise<void>((resolve, reject) => {
      db.run(
        query,
        [
          title,
          description,
          price,
          currency,
          category,
          bought,
          photoUrl,
          publicId,
          alt,
          discount,
          weight,
          ingredients,
        ],
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    const product = {
      title,
      description,
      price,
      currency,
      category,
      bought,
      photoUrl,
      publicId,
      alt,
      discount,
      weight,
      ingredients,
    };

    console.log("ds");
    return {
      message: "Product added successfully.",
      product,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product." });
  } finally {
    db.close();
  }
};

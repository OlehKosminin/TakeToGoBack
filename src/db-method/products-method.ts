import { Request, Response } from "express";
import db from "../db";
import IProduct from "../Interface/IProduct";

export const getAll = async (req: Request, res: Response, query: string) => {
  try {
    const rows = await new Promise<IProduct[]>((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(rows as IProduct[]);
        }
      });
    });
    return rows;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving products." });
  }
};

export const getById = async (
  req: Request,
  res: Response,
  query: string,
  productId: string
) => {
  try {
    const product = await new Promise<IProduct | null>((resolve, reject) => {
      db.get(query, [productId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as IProduct | null);
        }
      });
    });
    return product;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving product." });
  }
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

    return {
      message: "Product added successfully.",
      product,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product." });
  }
};

export const upd = async (
  req: Request,
  res: Response,
  query: string,
  productId: string,
  value: string | number
) => {
  try {
    await db.run(query, [value, productId]);
    return { message: "Product field updated successfully." };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product field." });
  }
};

export const deleteById = async (query: string, productId: string) => {
  return new Promise<void>((resolve, reject) => {
    db.run(query, [productId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const checkIfIdExists = async (id: string): Promise<boolean> => {
  const query = `SELECT COUNT(*) as count FROM products WHERE id = ?;`;

  return new Promise<boolean>((resolve, reject) => {
    db.get(query, [id], (err, row: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
};

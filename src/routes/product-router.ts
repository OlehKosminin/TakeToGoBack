import express from "express";

const router = express.Router();

import ctrl from "../controllers/products-controller";

import multerUploads from "../services/imageService";

router.get("/", ctrl.getAllProducts);

router.post("/", multerUploads, ctrl.createProduct);

router.get("/:id", ctrl.getProductById);

router.patch("/:id", ctrl.updProduct);

router.delete("/:id", ctrl.deleteById);

export default router;

import express from "express";

const router = express.Router();

import ctrl from "../controllers/products-controller";

import uploadPhoto from "../services/imageService";

router.get("/", ctrl.getAllProducts);

router.post("/", uploadPhoto.single("image"), ctrl.createProduct);

router.get("/:id", ctrl.getProductById);

router.patch("/:id", ctrl.updProduct);

router.delete("/:id", ctrl.deleteById);

export default router;

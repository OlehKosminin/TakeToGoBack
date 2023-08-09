import express from "express";

import ctrl from "../controllers/products-controller";

const router = express.Router();

router.get("/", ctrl.getAllProducts);

router.post("/", ctrl.createProduct);

router.get("/:id", ctrl.getProductById);

router.patch("/:id", ctrl.updProduct);

router.delete("/:id", ctrl.deleteById);

export default router;

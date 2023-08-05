import express from "express";

import ctrl from "../controllers/products-controller";

const router = express.Router();

router.get("/", ctrl.getAllProducts);

router.post("/", ctrl.createProduct);

export default router;

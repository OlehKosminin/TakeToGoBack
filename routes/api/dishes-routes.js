const express = require("express");

const ctrl = require("../../controllers/dishes-controllers");

const router = express.Router();

router.post("/add", ctrl.addDishes);

router.get("/", ctrl.getDishes);

router.delete("/:_id", ctrl.deleteDishes);

router.patch("/upd", ctrl.updDishes);

module.exports = router;

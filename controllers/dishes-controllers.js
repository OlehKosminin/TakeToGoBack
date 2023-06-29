const { Dishes } = require("../models/dishes");
const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");

const addDishes = async (req, res) => {
  const createDishes = await Dishes.create(req.body);
  res.json(createDishes);
};

const getDishes = async (req, res) => {
  // ["Pasta","Pizza"] return
  // getCategory
  const uniqueCategory = await Dishes.distinct("category");

  const { page = 1, limit = 1, search } = req.query;

  const skip = (page - 1) * limit;

  const data = await Dishes.find({ category: search }).limit(limit).skip(skip);
  console.log("data: ", data);

  res.json({
    data,
    uniqueCategory,
  });
};

const deleteDishes = async (req, res) => {
  const dishes = await Dishes.findByIdAndDelete(req.params);
  res.json(dishes);
};

const updDishes = async (req, res) => {
  const { body } = req;

  const options = !req.file
    ? {
        ...body,
      }
    : { ...body, publicId: req.file.filename, avatarUrl: req.file.path };

  const { _id } = req.body;

  const result = await Dishes.findOneAndUpdate(
    { _id },
    { ...options },
    { new: true }
  );

  if (!result) {
    throw HttpError(404);
  }

  const dishes = await Dishes.findOne({ _id });

  res.json(dishes);
};

module.exports = {
  getDishes: ctrlWrapper(getDishes),
  addDishes: ctrlWrapper(addDishes),
  deleteDishes: ctrlWrapper(deleteDishes),
  updDishes: ctrlWrapper(updDishes),
};

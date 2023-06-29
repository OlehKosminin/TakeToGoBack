const Joi = require("joi");
const { model, Schema } = require("mongoose");

const dishesShema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: String,
    required: [true, "Price is required"],
  },
  count: {
    type: String,
    required: [true, "Count is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  avatarUrl: {
    type: String,
    required: [true, "AvatarUrl is required"],
  },
  publicId: {
    type: String,
    required: [true, "PublicId is required"],
  },
});

const addDishes = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  count: Joi.string().required(),
  category: Joi.string().required(),
  avatarUrl: Joi.string().required(),
  publicId: Joi.string().required(),
});

const schemas = {
  addDishes,
};

const Dishes = model("dishes", dishesShema);

module.exports = { Dishes, schemas };

import cloudnaryStor from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { v4 as uuid } from "uuid";
require("dotenv").config();

const cloudinary = cloudnaryStor.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req) => {
    return {
      folder: `products-img/${Date.now()}`,
      format: "webp",
      public_id: uuid(),
      transformation: [{ width: 400, height: 300, crop: "fill" }],
      overwrite: true,
      quality: 85,
    };
  },
});

const uploadPhoto = multer({ storage });

export default uploadPhoto;

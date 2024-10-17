import Product from "../models/productsSchema.js";
import asyncHandler from "../utlis/asyncHandler.js";
import ErrorResponse from "../utlis/ErrorResponse.js";

// get All Products

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().populate("Category");
  if (!products.length) throw new ErrorResponse("No product found", 404);
  res.json(products);
});

// Add new Product

export const CreateProduct = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    throw new ErrorResponse("No file uploaded", 400);
  }

  const {
    name,
    description,
    brand,
    price,
    countInStock,
    reting,
    numReviews,
    isFeatured,
  } = req.body;
  const imageUrls = req.files.map((file) => file.path);

  if (
    !name ||
    !description ||
    !brand ||
    !price ||
    !countInStock ||
    !countInStock ||
    !reting ||
    !numReviews ||
    !isFeatured
  ) {
    throw new ErrorResponse("all fields are required", 418);
  }
  const newProduct = await Product.create({
    name,
    images: imageUrls,
    color,
  });

  res.status(201).json(newCategory);
});

import Product from "../../models/productSchema.js";
import asyncHandler from "../../utlis/asyncHandler.js";
import ErrorResponse from "../../utlis/ErrorResponse.js";

export const searchProduct = asyncHandler(async (req, res, next) => {
  const { query } = req.params;

  const product = await Product.find({
    name: { $regex: query, $options: "i" },
  }); // Check if product exists
  if (!product)
    throw new ErrorResponse(`Product with id: ${id} does not exist`, 404);
  res.json(product);
});

import Category from "../../models/categorySchema.js";
import Product from "../../models/productSchema.js";
import asyncHandler from "../../utlis/asyncHandler.js";
import ErrorResponse from "../../utlis/ErrorResponse.js";

export const getAllCategories = asyncHandler(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 5;

  const categories = await Category.find();

  if (!categories.length) {
    throw new ErrorResponse("No categories found", 404);
  }

  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const products = await Product.find({ category: category._id }).limit(
        limit
      );
      return {
        ...category._doc,
        products,
      };
    })
  );

  res.status(200).json(categoriesWithProducts);
});

// Get category by ID
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate(
    "products",
    "name images old_price new_price "
  );

  if (!category) {
    throw new ErrorResponse(`Category with ID ${id} not found`, 404);
  }

  res.status(200).json(category);
});

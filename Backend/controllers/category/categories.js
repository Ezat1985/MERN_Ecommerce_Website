import Category from '../../models/categorySchema.js';
import Product from '../../models/productSchema.js';
import asyncHandler from '../../utlis/asyncHandler.js';
import ErrorResponse from '../../utlis/ErrorResponse.js';

// Get all categories with products
export const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  if (!categories.length) {
    throw new ErrorResponse('No categories found', 404);
  }

  // For each category, find the products that belong to it
  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const products = await Product.find({ category: category.name });
      return {
        ...category._doc, // Spread the category data
        products, // Add the products for this category
      };
    })
  );

  res.status(200).json(categoriesWithProducts);
});

// Get category by ID
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    throw new ErrorResponse(`Category with ID ${id} not found`, 404);
  }

  res.status(200).json(category);
});

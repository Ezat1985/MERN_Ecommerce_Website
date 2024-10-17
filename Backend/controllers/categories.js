import Category from "../models/categorySchema.js";
import asyncHandler from "../utlis/asyncHandler.js";
import ErrorResponse from "../utlis/ErrorResponse.js";

// get all Categories

export const getAllCategories = asyncHandler(async (req, res, next) => {
  const categoryList = await Category.find();
  if (!categoryList.length) throw new ErrorResponse("No category found", 404);
  res.json(categoryList);
});

// get Category by id

export const getSingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category)
    throw new ErrorResponse(`Category with id: ${id} does not exist`, 404);
  res.json(category);
});

// Update Category
export const udpateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const { name, color } = req.body;
  const imageUrls = req.files.map((file) => file.path);
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name, images: imageUrls, color },
    { new: true }
  );
  if (!updatedCategory)
    throw new ErrorResponse(`Category with id: ${id} does not exist`, 404);

  res.json(updatedCategory);
});
// Delete Category

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const deletedcategory = await Category.findByIdAndDelete(id);
  if (!deletedcategory)
    throw new ErrorResponse(`Category with id: ${id} does not exist`, 404);

  res.json({ success: `Category with ${id} was deleted` });
});
// Add new Category
export const CreateCategory = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    throw new ErrorResponse("No file uploaded", 400);
  }

  const { name, color } = req.body;
  const imageUrls = req.files.map((file) => file.path);

  if (!name || !color) {
    throw new ErrorResponse("all fields are required", 418);
  }
  const newCategory = await Category.create({
    name,
    images: imageUrls,
    color,
  });

  res.status(201).json(newCategory);
});

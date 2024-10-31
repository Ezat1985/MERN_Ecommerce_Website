import Product from "../../models/productSchema.js";
import Category from "../../models/categorySchema.js";
import asyncHandler from "../../utlis/asyncHandler.js";
import ErrorResponse from "../../utlis/ErrorResponse.js";

// get All Products
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  if (!products.length) throw new ErrorResponse("No product found", 404);
  res.json(products);
});
// get Product by id
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public

export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate("category", " name"); // Check if product exists
  if (!product)
    throw new ErrorResponse(`Product with id: ${id} does not exist`, 404);
  res.json(product);
});
// Update Product
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const udpateProduct = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  console.log(id);
  const updatedProduct = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedProduct)
    throw new ErrorResponse(`Product with id: ${id} does not exist`, 404);

  res.json(updatedProduct);
});

// Add new Product
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

export const CreateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    brand,
    new_price,
    old_price,
    category: categoryName,
  } = req.body;
  const imageUrls = req.files.map((file) => file.path);

  if (
    !name ||
    !description ||
    !brand ||
    !new_price ||
    !old_price ||
    !categoryName
  ) {
    throw new ErrorResponse("Please fill the required fields", 418);
  }

  let category = await Category.findOne({ name: categoryName });
  if (!category) {
    category = new Category({
      name: categoryName,
      description: "NEW",
      products: [],
    });
    await category.save();
  }

  const newProduct = await Product.create({
    name,
    images: imageUrls,
    description,
    brand,
    new_price,
    old_price,
    category: category._id,
  });

  category.products.push(newProduct._id);
  await category.save();

  res.status(201).json(newProduct);
});

// Delete Product
// @desc    Delete single product
// @route   DELETE /api/products/:id
// @access  Private/Admin

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct)
    throw new ErrorResponse(`Product with id: ${id} does not exist`, 404);

  res.json({ success: `Product with ${id} was deleted` });
});

export const getProductsByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params;

  const products = await Product.find({ category });
  if (!products.length) {
    throw new ErrorResponse(`No products found in category: ${category}`, 404);
  }

  res.status(200).json(products);
});

export const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };

  let product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product?.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product?.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings =
    product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product?.save();

  res.status(200).json({
    success: true,
  });
};

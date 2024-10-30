import Product from '../../models/productSchema.js';
import asyncHandler from '../../utlis/asyncHandler.js';
import ErrorResponse from '../../utlis/ErrorResponse.js';

export const searchProducts = asyncHandler(async (req, res, next) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const products = await Product.find({
    name: { $regex: query, $options: 'i' },
  });

  res.json({ results: products });
});

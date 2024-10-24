import jwt from 'jsonwebtoken';
import asyncHandler from '../utlis/asyncHandler.js';
import ErrorResponse from '../utlis/ErrorResponse.js';
import User from '../models/userSchema.js';

export const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) throw new ErrorResponse('Please login', 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.uid).select('-password');
  if (!user) throw new ErrorResponse('User not found', 404);

  req.user = user;
  next();
});

export const admin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

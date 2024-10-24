import User from '../../models/userSchema.js';
import asyncHandler from '../../utlis/asyncHandler.js';
import ErrorResponse from '../../utlis/ErrorResponse.js';

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('-password');
  if (!users) {
    throw new ErrorResponse('No users found', 404);
  }
  res.status(200).json(users);
});

export const updateAdminStatus = asyncHandler(async (req, res, next) => {
  const { userId, admin } = req.body;

  if (!req.user || !req.user.admin) {
    throw new ErrorResponse('Not authorized to perform this action', 403);
  }

  const user = await User.findByIdAndUpdate(userId, { admin }, { new: true });

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  res.status(200).json({
    success: true,
    message: `User ${user.username}'s admin status updated to ${admin}`,
    user,
  });
});

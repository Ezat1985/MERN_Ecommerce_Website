import jwt from "jsonwebtoken";
import asyncHandler from "../utlis/asyncHandler.js";
import ErrorResponse from "../utlis/ErrorResponse.js";
import User from "../models/userSchema.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  /*
    Check if token is present in request [X]
        - If not, return an error [X]
        - If present:
            - verifyToken using jwt.verify [X]
            - If invalid return an error [X]
            - If valid
                - create uid property in request [X]
                - next();
*/

  // const token = req.headers['authorization'];
  const token = req.cookies.token;

  if (!token) throw new ErrorResponse("Please login", 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.uid = decoded.uid;
  next();
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export default { verifyToken, admin };

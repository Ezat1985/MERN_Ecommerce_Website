import { Router } from "express";
import * as authController from "../controllers/user/auth.js";
import { admin, verifyToken } from "../middlewares/verifyToken.js";
import { getAllUsers, updateAdminStatus } from "../controllers/user/user.js";

const authRouter = Router();

authRouter.post("/register", authController.signUp);
authRouter.post("/login", authController.signIn);
authRouter.get("/me", verifyToken, authController.getUser);
authRouter.post("/logout", verifyToken, authController.signOut);

authRouter.get("/users", verifyToken, admin, getAllUsers);
authRouter.put("/update-admin-status", verifyToken, admin, updateAdminStatus);

export default authRouter;

import { Router } from "express";
import * as categoryController from "../controllers/categories.js";
import upload from "../services/upload.js";

const categoriesRouter = Router();

categoriesRouter
  .route("/")
  .get(categoryController.getAllCategories)

  .post(upload.array("images", 5), categoryController.CreateCategory);
categoriesRouter
  .route("/:id")
  .get(categoryController.getSingleCategory)
  .delete(categoryController.deleteCategory)
  .put(categoryController.udpateCategory);

export default categoriesRouter;

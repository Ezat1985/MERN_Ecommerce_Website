import { Router } from "express";
import * as productController from "../controllers/products.js";
import upload from "../services/upload.js";

const productsRouter = Router();

productsRouter
  .route("/")
  .get(productController.getAllProducts)
  .post(upload.array("images", 5), productController.CreateProduct);

productsRouter
  .route("/:id")
  .get(productController.getSingleProduct)
  .delete(productController.deleteProduct)
  .put(productController.udpateProduct);

export default productsRouter;

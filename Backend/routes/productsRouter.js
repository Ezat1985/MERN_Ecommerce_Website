import { Router } from "express";
import * as productController from "../controllers/product/products.js";
import upload from "../services/upload.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { admin } from "../middlewares/verifyToken.js";

const productsRouter = Router();

productsRouter
  .route("/")
  .get(productController.getAllProducts)
  .post(
    upload.array("images", 5),
    verifyToken,
    admin,
    productController.CreateProduct
  );

productsRouter
  .route("/:id")
  .get(productController.getSingleProduct)
  .delete(verifyToken, admin, productController.deleteProduct)
  .put(verifyToken, admin, productController.udpateProduct);

export default productsRouter;

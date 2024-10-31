import { Router } from "express";
import * as productController from "../controllers/product/products.js";
import upload from "../services/upload.js";
import { admin, verifyToken } from "../middlewares/verifyToken.js";
import { searchProducts } from "../controllers/product/searchProduct.js";

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
  .route("/category/:category")
  .get(productController.getProductsByCategory);

productsRouter.route("/search").get(searchProducts);
productsRouter
  .route("/review")
  .put(verifyToken, admin, productController.createProductReview);

productsRouter
  .route("/:id")
  .get(productController.getSingleProduct)
  .delete(verifyToken, admin, productController.deleteProduct)
  .put(verifyToken, admin, productController.udpateProduct);

export default productsRouter;

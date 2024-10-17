import { Router } from "express";
import * as productController from "../controllers/products.js";
import upload from "../services/upload.js";

const productsRouter = Router();

productsRouter.route("/").get(productController.getAllProducts);

export default productsRouter;

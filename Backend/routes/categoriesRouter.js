import { Router } from "express";
import { getCategoryProduct } from "../controllers/product/getCategoryProductOne.js";
import { getCategoryWiseProduct } from "../controllers/product/getCategoryWiseProduct.js";

const categoryRouter = Router();

categoryRouter.route("/").get(getCategoryProduct);
categoryRouter.route("/").post(getCategoryWiseProduct);

export default categoryRouter;

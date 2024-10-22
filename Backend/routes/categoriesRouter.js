import { Router } from "express";
import { getCategoryProduct } from "../controllers/getCategoryProductOne.js";

const categoryRouter = Router();

categoryRouter.route("/").get(getCategoryProduct);

export default categoryRouter;

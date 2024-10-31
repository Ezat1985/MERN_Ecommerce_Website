import { Router } from 'express';
import * as categoryController from '../controllers/category/categories.js';

const categoryRouter = Router();

categoryRouter.route('/').get(categoryController.getAllCategories);
categoryRouter.route('/:id').get(categoryController.getCategoryById);

export default categoryRouter;

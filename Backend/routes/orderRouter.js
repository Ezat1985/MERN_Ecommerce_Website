import { Router } from 'express';
import * as orderController from '../controllers/order/order.js';
import { admin, verifyToken } from '../middlewares/verifyToken.js';

const ordersRouter = Router();

ordersRouter.route('/').get(verifyToken, admin, orderController.getAllOrders);

ordersRouter
  .route('/myorders')
  .get(verifyToken, admin, orderController.getMyOrders);

ordersRouter.route('/:id').get(verifyToken, orderController.getSingleOrder);

ordersRouter
  .route('/:id/pay')
  .put(verifyToken, orderController.updateOrderToPaid);

ordersRouter
  .route('/:id/deliver')
  .put(verifyToken, admin, orderController.updateOrderToDelivered);

export default ordersRouter;

import { Router } from 'express';
import OrdersController from '../controller/orders.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router: Router = Router();

const ordersController = new OrdersController();

router.get('/orders', ordersController.getAll);
router.post('/orders', authMiddleware);

export default router;
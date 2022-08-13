import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrdersService from '../services/orders.service';

class OrdersController {
  constructor(private ordersService = new OrdersService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.ordersService.getAll();
    res.status(StatusCodes.OK).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { user, ...productsIds } = req.body; // remove o user do objeto
    const result = await this.ordersService.create(user.id, productsIds);
    res.status(StatusCodes.CREATED).json(result);
  };
}

export default OrdersController;
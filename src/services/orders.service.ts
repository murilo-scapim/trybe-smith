import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { Order, OrderWithProductsIds } from '../interfaces/order.interface';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getOrdersWithProductsIds(orders: Order[]): Promise<OrderWithProductsIds[]> {
    const result = await Promise.all(orders
      .map(async (order) => ({
        id: order.id,
        userId: order.userId,
        productsIds: await this.model.getOrderWithProductsIds(order.id),
      })));
    return result as OrderWithProductsIds[];
  }

  public async getAll(): Promise<OrderWithProductsIds[]> {
    const orders = await this.model.getAll();
    const ordersWithProductsIds = await this.getOrdersWithProductsIds(orders);
    return ordersWithProductsIds;
  }
}

export default OrderService;
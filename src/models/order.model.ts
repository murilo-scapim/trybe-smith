import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Order, OrderOnlyProductsIds, OrderWithProductsIds } from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getOrderWithProductsIds(orderId: number): Promise<number[]> {
    const query = 'SELECT id FROM Trybesmith.Products WHERE orderId = ?';
    const [result] = await this.connection.execute<RowDataPacket[]>(query, [orderId]);
   
    // map devolve um array com os resultados da função de callback
    return result.map((row) => row.id);
  }

  public async getAll(): Promise<Order[]> {
    const query = 'SELECT * FROM Trybesmith.Orders';
    const [result] = await this.connection.execute(query);
    
    return result as Order[];
  }

  public async create(userId: number, data: OrderOnlyProductsIds):
  Promise<OrderWithProductsIds> {
    const queryCreateOrder = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
    const [{ insertId }] = await this.connection
      .execute<ResultSetHeader>(queryCreateOrder, [userId]);
    const queryUpdateProduct = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id IN (?)';
    await this.connection
      .query<ResultSetHeader>(queryUpdateProduct, [insertId, data.productsIds]);    
    
    return {
      userId,
      productsIds: data.productsIds,
    } as OrderWithProductsIds;
  }
}
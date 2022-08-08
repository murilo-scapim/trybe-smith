import { Pool, RowDataPacket } from 'mysql2/promise';
import { Order } from '../interfaces/order.interface';

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
}
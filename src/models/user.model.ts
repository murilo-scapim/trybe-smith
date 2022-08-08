import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import User from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.Users (username, classe, level, password)
      VALUES (?, ?, ?, ?)`,
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }

  public async login(user: User): Promise<User> {
    const query = `SELECT id, username FROM Trybesmith.Users
       WHERE username = ? AND password = ?`;
    const [[result]] = await this.connection
      .execute<RowDataPacket[]>(query, [user.username, user.password]);
      
    return result as User;
  }
}
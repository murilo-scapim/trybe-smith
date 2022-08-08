import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { User, UserLogin, UserWithoutPassword } from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<UserWithoutPassword > {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.Users (username, classe, level, password)
      VALUES (?, ?, ?, ?)`,
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;

    return {
      id: insertId,
      username,
      classe,
      level,
    };
  }

  public async login(user: UserLogin): Promise<UserWithoutPassword> {
    const query = `SELECT id, username, classe, level FROM Trybesmith.Users
       WHERE username = ? AND password = ?`;
    const [[result]] = await this.connection
      .execute<RowDataPacket[]>(query, [user.username, user.password]);
      
    return result as UserWithoutPassword;
  }
}
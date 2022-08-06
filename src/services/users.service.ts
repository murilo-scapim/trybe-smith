import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import { createToken } from '../utils/authJwt';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<string> {
    const userCreated: User = await this.model.create(user);
    return createToken(userCreated);
  }
}

export default UserService;
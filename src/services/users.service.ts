import { UnauthorizedError } from 'restify-errors';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import { createToken } from '../utils/authJwt';
import userLoginValidation from '../utils/login.validation';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<string> {
    const userCreated: User = await this.model.create(user);
    return createToken(userCreated);
  }

  public async login(user: User): Promise<string> {
    userLoginValidation(user);
    const userFound: User = await this.model.login(user);
    if (!userFound) {
      throw new UnauthorizedError('Username or password invalid');
    }

    const token = createToken(userFound);
    return token;
  }
}

export default UserService;
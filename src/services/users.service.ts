import { UnauthorizedError } from 'restify-errors';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import { User, UserLogin, UserWithoutPassword } from '../interfaces/user.interface';
import { createToken } from '../utils/authJwt';
import userLoginValidation from '../utils/login.validation';
import userBodyValidation from '../utils/user.validation';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<string> {
    userBodyValidation(user);
    const userCreated: UserWithoutPassword = await this.model.create(user);
    const token = createToken(userCreated);
    return token;
  }

  public async login(user: UserLogin): Promise<string> {
    userLoginValidation(user);
    const userFound: UserWithoutPassword = await this.model.login(user);
    if (!userFound) {
      throw new UnauthorizedError('Username or password invalid');
    }

    const token = createToken(userFound);
    return token;
  }
}

export default UserService;
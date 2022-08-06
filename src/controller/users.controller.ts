import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../interfaces/user.interface';
import UserService from '../services/users.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const user: User = req.body;
    const token: string = await this.userService.create(user);
    
    res.status(StatusCodes.CREATED).json({ token });
  };
}

export default UserController;
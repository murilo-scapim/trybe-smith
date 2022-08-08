import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { UnauthorizedError } from 'restify-errors';
import { UserWithoutPassword } from '../interfaces/user.interface';

const secret = 'Trybe';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload: JwtPayload): string =>
  jwt.sign({ ...payload }, secret, jwtConfig);

const verifyToken = (token: string): UserWithoutPassword => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as UserWithoutPassword;
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }
};

export {
  createToken,
  verifyToken,
};
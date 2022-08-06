import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const secret = 'Trybe';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload: JwtPayload): string =>
  jwt.sign(payload, secret, jwtConfig);

export {
  createToken,
};
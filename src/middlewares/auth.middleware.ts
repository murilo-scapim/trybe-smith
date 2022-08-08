import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'restify-errors';
import { verifyToken } from '../utils/authJwt';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  
  if (!token) {
    throw new UnauthorizedError('Token not found');
  }

  req.body.user = verifyToken(token);

  next();
};
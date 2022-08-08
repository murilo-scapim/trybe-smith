import { NextFunction, Request, Response } from 'express';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  
  switch (name) {
    case 'ValidationError': {
      const status = details[0].type === 'any.required' ? 400 : 422;
      res.status(status).json({ message });
      break;
    }
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(401).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }

  next();
};
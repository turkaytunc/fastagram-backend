import { NextFunction, Response, Request } from 'express';
import { HttpError } from '../utils';

const error404 = (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError('Page Not Found', 404);
  return next(error);
};

export default error404;

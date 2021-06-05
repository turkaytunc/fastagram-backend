import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils';

const globalError = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || 500;
  return res.status(status).json({
    message: error.message || 'An unexpected error occurred!',
  });
};

export default globalError;

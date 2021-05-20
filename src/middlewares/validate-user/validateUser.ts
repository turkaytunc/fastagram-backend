import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RequestHandler, Request } from 'express';
import { HttpError } from '../../utils';

dotenv.config();

const secret = process.env.JWT_SECRET!;

interface UserRequest extends Request {
  user?: {};
}

export const validateUser: RequestHandler = async (req: UserRequest, res, next) => {
  try {
    const { auth } = req.body;

    const token = jwt.verify(auth, secret) as any;
    req.user = token.user;
    return next();
  } catch (error) {
    const err = new HttpError('You must provide valid auth token', 403);
    return next(err);
  }
};

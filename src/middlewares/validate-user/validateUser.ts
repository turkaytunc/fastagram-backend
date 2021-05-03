import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { HttpError } from '../../utils';

dotenv.config();

const secret = process.env.JWT_SECRET!;

export const validateUser = async (req: any, res: any, next: any) => {
  try {
    const { auth } = req.cookies;

    const token = jwt.verify(auth, secret) as any;
    req.user = token.user;

    return next();
  } catch (error) {
    const err = new HttpError('You must provide valid auth token', 403);
    return next(err);
  }
};

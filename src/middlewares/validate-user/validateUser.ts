import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { HttpError } from '../../utils';

dotenv.config();

const secret = process.env.JWT_SECRET!;

export const validateUser = async (req: any, res: any, next: any) => {
  try {
    console.log(req.cookies);
    const { auth } = req.cookies;

    console.log(auth);

    const token = jwt.verify(auth, secret) as any;

    console.log(token);

    req.user = token.user;
    return next();
  } catch (error) {
    const err = new HttpError('You must provide valid auth token', 403);
    return next(err);
  }
};

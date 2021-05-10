import { RequestHandler, Request } from 'express';
import { HttpError } from '../utils';
import { findUserByEmail } from '../db/User';

interface UserRequest extends Request {
  user?: { email: string };
}

export const dashboard: RequestHandler = async (req: UserRequest, res, next) => {
  try {
    if (!req?.user) {
      throw new HttpError('User not found', 404);
    }

    const user = await findUserByEmail(req?.user?.email);
    if (user.rows[0]) {
      const { name, email, user_id: userId } = user.rows[0];
      return res.json({ user: { name, email, userId } });
    }

    throw new HttpError('User not found', 404);
  } catch (error) {
    return next(error);
  }
};

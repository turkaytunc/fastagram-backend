import { RequestHandler, Request } from 'express';
import { HttpError } from '../utils';
import User from '../db/User';
import Feed from '../db/Feed';

interface UserRequest extends Request {
  user?: { email: string; userId: string };
}

export const dashboard: RequestHandler = async (req: UserRequest, res, next) => {
  try {
    if (!req?.user) {
      throw new HttpError('User not found', 404);
    }

    const user = await User.findUserByEmail(req?.user?.email);
    if (user.rows[0]) {
      const { name, email, user_id: userId } = user.rows[0];
      return res.json({ user: { name, email, userId } });
    }

    throw new HttpError('User not found', 404);
  } catch (error) {
    return next(error);
  }
};

export const getFeedItems: RequestHandler = async (req: Request, res, next) => {
  try {
    const user = await Feed.getFeedPhotos();
    if (user.rows[0]) {
      return res.json({ feedItems: user.rows });
    }

    throw new HttpError('No photos found', 404);
  } catch (error) {
    return next(error);
  }
};

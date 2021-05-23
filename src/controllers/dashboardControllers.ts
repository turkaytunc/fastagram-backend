import { RequestHandler, Request } from 'express';
import { HttpError } from '../utils';
import { findUserByEmail } from '../db/User';
import { getFeedPhotos } from '../db/Feed';
import { getCommentsByPhotoId } from '../db/Comment';

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

export const getFeedItems: RequestHandler = async (req: Request, res, next) => {
  try {
    const user = await getFeedPhotos();
    if (user.rows[0]) {
      return res.json({ feedItems: user.rows });
    }

    throw new HttpError('User not found', 404);
  } catch (error) {
    return next(error);
  }
};

export const getComments: RequestHandler = async (req: Request, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { photo_id } = req.body;
    const user = await getCommentsByPhotoId(photo_id);
    if (user.rows[0]) {
      return res.json({ comments: user.rows });
    }

    throw new HttpError('No comments found', 404);
  } catch (error) {
    return next(error);
  }
};

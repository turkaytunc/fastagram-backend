import { RequestHandler, Request } from 'express';
import { HttpError } from '../utils';
import User from '../db/User';
import Feed from '../db/Feed';
import Comment from '../db/Comment';

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

export const getComments: RequestHandler = async (req: Request, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { photo_id } = req.body;
    const comments = await Comment.getComments(photo_id);
    if (comments.rows[0]) {
      return res.json({ comments: comments.rows });
    }

    throw new HttpError('No comments found', 404);
  } catch (error) {
    return next(error);
  }
};

export const addComment: RequestHandler = async (req: UserRequest, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { photo_id, content } = req.body;

    const userId = req.user?.userId as string;

    const user = await User.findUserById(userId);
    const comment = await Comment.addComment(photo_id, userId, user.rows[0].username, content);
    if (comment.rows[0]) {
      return res.json({ comment: comment.rows[0] });
    }

    throw new HttpError("Couldn't add comment", 400);
  } catch (error) {
    return next(error);
  }
};

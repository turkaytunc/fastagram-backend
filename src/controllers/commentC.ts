import { RequestHandler, Request } from 'express';

import Comment from '../db/Comment';
import User from '../db/User';
import { HttpError } from '../utils';

interface UserRequest extends Request {
  user?: { email: string; userId: string };
}

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

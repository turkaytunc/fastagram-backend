import { RequestHandler, Request } from 'express';
import { HttpError } from '../utils';
import { findUserByEmail } from '../db/User';
import Feed from '../db/Feed';
import Comment from '../db/Comment';
import Like from '../db/Like';

interface UserRequest extends Request {
  user?: { email: string; userId: string };
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
    const user = await Feed.getFeedPhotos();
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
    const user = await Comment.getComments(photo_id);
    if (user.rows[0]) {
      return res.json({ comments: user.rows });
    }

    throw new HttpError('No comments found', 404);
  } catch (error) {
    return next(error);
  }
};

export const addComment: RequestHandler = async (req: Request, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { photo_id, user_id, content } = req.body;
    const comment = await Comment.addComment(photo_id, user_id, content);
    if (comment.rows[0]) {
      return res.json({ comment: comment.rows[0] });
    }

    throw new HttpError("Couldn't add comment", 400);
  } catch (error) {
    return next(error);
  }
};

export const getLikes: RequestHandler = async (req: Request, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { photo_id } = req.body;
    const likes = await Like.getLikes(photo_id);

    if (likes.rows[0]) {
      return res.json({ likes: likes.rows[0] });
    }

    return res.json({ likes: 0 });
  } catch (error) {
    return next(error);
  }
};
export const addLike: RequestHandler = async (req: UserRequest, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { photo_id } = req.body;

    const foundLike = await Like.findLike(photo_id, req.user?.userId as string);

    if (foundLike.rows[0]) {
      await Like.removeLike(photo_id, req.user?.userId as string);
      return res.json({ isLiked: false });
    }

    await Like.addLike(photo_id, req.user?.userId as string);
    return res.json({ isLiked: true });
  } catch (error) {
    return next(error);
  }
};

export const isLiked: RequestHandler = async (req: UserRequest, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { photo_id } = req.body;

    const foundLike = await Like.findLike(photo_id, req.user?.userId as string);
    if (foundLike.rows[0]) {
      return res.json({ isLiked: true });
    }

    return res.json({ isLiked: false });
  } catch (error) {
    return next(error);
  }
};

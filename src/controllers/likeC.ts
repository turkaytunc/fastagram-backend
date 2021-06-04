import { RequestHandler, Request } from 'express';
import Like from '../db/Like';

interface UserRequest extends Request {
  user?: { email: string; userId: string };
}

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

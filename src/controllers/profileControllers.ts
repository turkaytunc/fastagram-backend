import { RequestHandler } from 'express';
import { HttpError } from '../utils';
import { getUserPhotos } from '../db/User';

export const fetchUserPhotos: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const photos = await getUserPhotos(userId);
      return res.status(200).json({ photos: photos.rows[0] });
    }
    throw new HttpError('Oops something went wrong', 500);
  } catch (error) {
    return next(error);
  }
};

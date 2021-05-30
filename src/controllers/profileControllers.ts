import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HttpError } from '../utils';
import Photo from '../db/Photo';
import User from '../db/User';

export const getPhotos: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const photos = await Photo.getAllPhotos(userId);
      return res.status(200).json({ photos: photos.rows });
    }
    throw new HttpError('Oops something went wrong', 400);
  } catch (error) {
    return next(error);
  }
};

interface UserRequest extends Request {
  user?: { email: string };
}

export const addPhoto = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const email = req?.user?.email;
    const { photoData } = req.body;
    if (!email) {
      throw new HttpError('Oops something went wrong', 400);
    }

    const user = await User.findUserByEmail(email);
    if (!user) {
      throw new HttpError('Oops something went wrong', 400);
    }
    const photos = await Photo.addPhotoByUserId(user.rows[0].user_id, photoData);
    return res.status(200).json({ photo: photos.rows[0] });
  } catch (error) {
    return next(error);
  }
};

export const getProfile = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;

    const email = req?.user?.email;
    if (!email) {
      throw new HttpError('Oops something went wrong', 400);
    }

    const user = await User.findUserById(userId);
    if (!user) {
      throw new HttpError('Oops something went wrong', 400);
    }

    return res.status(200).json({ profile: user.rows[0] });
  } catch (error) {
    return next(error);
  }
};

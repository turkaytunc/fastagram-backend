import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HttpError } from '../utils';
import { getAllPhotos, addPhotoByUserId } from '../db/Photo';
import { findUserByEmail, findUserById } from '../db/User';

export const getPhotos: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const photos = await getAllPhotos(userId);
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

    const user = await findUserByEmail(email);
    if (!user) {
      throw new HttpError('Oops something went wrong', 400);
    }
    const photos = await addPhotoByUserId(user.rows[0].user_id, photoData);
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

    const user = await findUserById(userId);
    if (!user) {
      throw new HttpError('Oops something went wrong', 400);
    }

    return res.status(200).json({ profile: user.rows[0] });
  } catch (error) {
    return next(error);
  }
};

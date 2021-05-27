import { NextFunction, Request, Response } from 'express';
import { searchUserByUsername } from '../db/User';
import { HttpError } from '../utils';

export const findUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.query;
    console.log(username);
    if (!username) {
      throw new HttpError('Please provide valid username ', 400);
    }

    const users = await searchUserByUsername(username as string);
    if (!users.rows[0]) {
      throw new HttpError('Oops something went wrong', 404);
    }
    return res.status(200).json({ users: users.rows });
  } catch (error) {
    return next(error);
  }
};

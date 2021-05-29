import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';

import { generateToken, HttpError } from '../utils';
import { createUser, findUserByEmail } from '../db/User';

dotenv.config();

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    const isUserExist = user?.rows?.length !== undefined && user?.rows?.length > 0;
    if (!isUserExist) {
      throw new HttpError('User not exists!', 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (isPasswordValid) {
      const token = generateToken(email, user.rows[0].user_id);

      return res.status(200).json({
        user: {
          name: user.rows[0].name,
          userId: user.rows[0].user_id,
          email: user.rows[0].email,
        },
        token,
      });
    }

    throw new HttpError('Wrong email or password!', 403);
  } catch (error) {
    return next(error);
  }
};

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, fullname, email, password } = req.body;

    const foundUser = await findUserByEmail(email);

    const isUserExist = foundUser?.rows?.length !== undefined && foundUser?.rows?.length > 0;
    if (isUserExist) {
      throw new HttpError('User already exists!', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUser(username, fullname, email, hashedPassword);

    const token = generateToken(email, user.rows[0].user_id);

    return res.status(201).json({
      user: {
        name: user.rows[0].name,
        userId: user.rows[0].user_id,
        email: user.rows[0].email,
      },
      token,
    });
  } catch (error) {
    return next(error);
  }
};

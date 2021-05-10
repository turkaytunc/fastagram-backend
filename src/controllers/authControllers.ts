import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { generateToken, HttpError } from '../utils';
import { createUser, findUserByEmail } from '../db/User';

dotenv.config();
const TEN_MINUTE = 1000 * 60 * 10;

export const login = async (req: any, res: any, next: (arg0: any) => any) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    const isUserExist = user?.rows?.length !== undefined && user?.rows?.length > 0;
    if (!isUserExist) {
      throw new HttpError('User not exists!', 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (isPasswordValid) {
      const token = generateToken(email);
      res.cookie('auth', token, {
        maxAge: TEN_MINUTE,
        httpOnly: true,
        secure: true,
        samesite: 'lax',
      });
      return res.status(200).json({
        user: {
          name: user.rows[0].name,
          userId: user.rows[0].user_id,
          email: user.rows[0].email,
        },
      });
    }

    throw new HttpError('Wrong email or password!', 403);
  } catch (error) {
    return next(error);
  }
};

export const register = async (
  req: { body: { username: any; email: any; password: any } },
  res: any,
  next: (arg0: any) => any
) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUser(username, email, hashedPassword);

    const token = generateToken(email);
    res.cookie('auth', token, {
      maxAge: TEN_MINUTE,
      httpOnly: true,
      secure: true,
      samesite: 'lax',
    });
    return res.status(201).json({
      user: {
        name: user.rows[0].name,
        userId: user.rows[0].user_id,
        email: user.rows[0].email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req: any, res: any, next: any) => {
  try {
    const { auth } = req.cookies;

    if (auth) {
      res.cookie('auth', ' ', {
        maxAge: 1,
        httpOnly: true,
        secure: true,
        samesite: 'Lax',
      });
      return res.status(200).json({ message: 'Logout Successful.' });
    }
    throw new HttpError('Oops something went wrong', 500);
  } catch (error) {
    return next(error);
  }
};

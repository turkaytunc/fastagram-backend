import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { generateToken, HttpError } from '../../utils';
import { createUser, findUserById, findUserByEmail } from '../../db/User';

dotenv.config();
const TEN_MINUTE = 1000 * 60 * 10;
const secret = process.env.JWT_SECRET!;

export const login = async (req: any, res: any, next: (arg0: any) => any) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    const isUserExist = user?.rows?.length !== undefined || user?.rows?.length > 0;
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
      return res.status(200).json({ message: 'login successful' });
    }

    throw new HttpError('Wrong email or password!', 403);
  } catch (error) {
    return next(error);
  }
};

export const register = async (
  req: { body: { name: any; email: any; password: any } },
  res: any,
  next: (arg0: any) => any
) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUser(name, email, hashedPassword);

    const token = generateToken(email);
    res.cookie('auth', token, {
      maxAge: TEN_MINUTE,
      httpOnly: true,
      secure: true,
      samesite: 'lax',
    });
    return res.status(200).json({ message: 'login successful' });
  } catch (error) {
    return next(error);
  }
};

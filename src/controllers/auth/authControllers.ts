import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, findUser } from '../../db/User';

dotenv.config();

export const login = async (req: any, res: any, next: (arg0: any) => any) => {
  try {
    const user = await findUser('ee42dffd-2d53-496f-be74-1c18a4ab2df1');

    const isUserExist = user?.rows?.length !== undefined || user?.rows?.length > 0;
    if (isUserExist) {
      return res.json({ user: user.rows[0] });
    }

    return res.json({ message: 'User not found' });
  } catch (error) {
    return next(error);
  }
};

export const register = async (
  req: { body: { name: any; email: any; password: any } },
  res: { json: (arg0: { user: any }) => any },
  next: (arg0: any) => any
) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUser(name, email, password);

    return res.json({ user: user.rows[0] });
  } catch (error) {
    return next(error);
  }
};

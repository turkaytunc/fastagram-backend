import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, findUser } from '../../db/User';

dotenv.config();

export const login = async (req: any, res: any, next: (arg0: any) => any) => {
  const user = await findUser('mahmut');

  res.json({ user });
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

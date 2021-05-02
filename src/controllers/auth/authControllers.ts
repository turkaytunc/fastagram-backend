import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, getUser } from '../../db/User';

dotenv.config();

export const loginController = async (req: any, res: any, next: (arg0: any) => any) => {
  const user = await getUser('mahmut');

  res.json({ user });
};

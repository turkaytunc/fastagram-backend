import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

export const loginController = async (
  req: { body: { email: any; password: any } },
  res: any,
  next: (arg0: any) => any
) => {};

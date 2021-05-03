import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const TEN_MINUTE = 1000 * 60 * 10;
const secret = process.env.JWT_SECRET!;

export const generateToken = (email: string) =>
  jwt.sign({ user: { email } }, secret, {
    expiresIn: `${TEN_MINUTE}ms`,
  });

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SIXTY_MINUTES = 1000 * 60 * 60;
const secret = process.env.JWT_SECRET!;

export const generateToken = (email: string, userId: string) =>
  jwt.sign({ user: { email, userId } }, secret, {
    expiresIn: `${SIXTY_MINUTES}ms`,
  });

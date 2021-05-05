import { HttpError } from '../utils';
import { findUserByEmail } from '../db/User';

export const dashboard = async (req: any, res: any, next: (arg0: any) => any) => {
  try {
    const user = await findUserByEmail(req?.user?.email);

    if (user.rows[0]) {
      const { name, email, user_id: userId } = user.rows[0];
      return res.json({ user: { name, email, userId } });
    }

    throw new HttpError('User not found', 404);
  } catch (error) {
    return next(error);
  }
};

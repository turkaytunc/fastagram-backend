import { NextFunction, Response, Request } from 'express';
import { initializeDB } from '../db/initializeDB';

let isInit = false;
const init = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isInit === false) {
      await initializeDB();
      isInit = true;
      return res.json({ message: 'Initial configuration completed successfully!' });
    }
    return res.json({ message: 'Hello from express!' });
  } catch (error) {
    return next(error);
  }
};

export default init;

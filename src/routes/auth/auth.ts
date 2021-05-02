import express from 'express';
import { authControllers } from '../../controllers';

const auth = express.Router();

auth.get('/', (req, res, next) => {
  res.json({ message: 'hello from auth' });
});

export default auth;

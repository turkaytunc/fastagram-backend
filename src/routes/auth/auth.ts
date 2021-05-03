import express from 'express';
import { authControllers } from '../../controllers';

const auth = express.Router();

auth.post('/register', authControllers.register);
auth.post('/login', authControllers.login);

export default auth;

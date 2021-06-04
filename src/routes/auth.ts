import express from 'express';
import { authC } from '../controllers';

const auth = express.Router();

auth.post('/register', authC.register);
auth.post('/login', authC.login);

export default auth;

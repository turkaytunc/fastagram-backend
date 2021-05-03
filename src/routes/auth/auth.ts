import express from 'express';
import { authControllers } from '../../controllers';

const auth = express.Router();

auth.post('/register', authControllers.register);

export default auth;

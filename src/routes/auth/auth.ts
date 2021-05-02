import express from 'express';
import { authControllers } from '../../controllers';

const auth = express.Router();

auth.get('/', authControllers.loginController);

export default auth;

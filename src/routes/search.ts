import express from 'express';
import { searchControllers } from '../controllers';

const search = express.Router();

search.get('/', searchControllers.findUser);

export default search;

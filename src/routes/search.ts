import express from 'express';
import { searchC } from '../controllers';

const search = express.Router();

search.get('/', searchC.findUser);

export default search;

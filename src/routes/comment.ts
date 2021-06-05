import express from 'express';
import { commentC } from '../controllers';
import { validateUser } from '../middlewares';

const comment = express.Router();

comment.post('/add', validateUser, commentC.addComment);
comment.post('/all', validateUser, commentC.getComments);

export default comment;

import express from 'express';
import { dashboardC } from '../controllers';
import { validateUser } from '../middlewares';

const comment = express.Router();

comment.post('/add', validateUser, dashboardC.addComment);
comment.post('/all', validateUser, dashboardC.getComments);

export default comment;

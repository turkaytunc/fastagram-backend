import express from 'express';
import { dashboardControllers } from '../controllers';
import { validateUser } from '../middlewares';

const comment = express.Router();

comment.post('/add', validateUser, dashboardControllers.addComment);
comment.post('/all', validateUser, dashboardControllers.getComments);

export default comment;

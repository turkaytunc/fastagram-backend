import express from 'express';
import { dashboardControllers } from '../controllers';
import { validateUser } from '../middlewares';

const like = express.Router();

like.post('/all', validateUser, dashboardControllers.getLikes);
like.post('/add', validateUser, dashboardControllers.addLike);
like.post('/isliked', validateUser, dashboardControllers.isLiked);

export default like;

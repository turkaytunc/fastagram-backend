import express from 'express';
import { likeControllers } from '../controllers';
import { validateUser } from '../middlewares';

const like = express.Router();

like.post('/all', validateUser, likeControllers.getLikes);
like.post('/add', validateUser, likeControllers.addLike);
like.post('/isliked', validateUser, likeControllers.isLiked);

export default like;

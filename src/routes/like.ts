import express from 'express';
import { likeC } from '../controllers';
import { validateUser } from '../middlewares';

const like = express.Router();

like.post('/all', validateUser, likeC.getLikes);
like.post('/add', validateUser, likeC.addLike);
like.post('/isliked', validateUser, likeC.isLiked);

export default like;

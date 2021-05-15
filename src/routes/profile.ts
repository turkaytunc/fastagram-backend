import express from 'express';
import { validateUser } from '../middlewares';
import { profileControllers } from '../controllers';

const profile = express.Router();

profile.get('/:userId', validateUser, profileControllers.fetchPhotos);
profile.post('/addphoto/:userId', validateUser, profileControllers.addPhoto);

export default profile;

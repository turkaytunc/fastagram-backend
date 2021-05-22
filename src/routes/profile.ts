import express from 'express';
import { validateUser } from '../middlewares';
import { profileControllers } from '../controllers';

const profile = express.Router();

profile.post('/photos/:userId', validateUser, profileControllers.getPhotos);
profile.post('/addphoto/', validateUser, profileControllers.addPhoto);
profile.post('/', validateUser, profileControllers.getProfile);

export default profile;

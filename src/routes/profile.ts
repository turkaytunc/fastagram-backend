import express from 'express';
import { validateUser } from '../middlewares';
import { profileControllers } from '../controllers';

const profile = express.Router();

profile.post('/getphoto/:userId', validateUser, profileControllers.fetchPhotos);
profile.post('/addphoto/', validateUser, profileControllers.addPhoto);

export default profile;

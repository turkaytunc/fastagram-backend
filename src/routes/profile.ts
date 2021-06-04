import express from 'express';
import { validateUser } from '../middlewares';
import { profileC } from '../controllers';

const profile = express.Router();

profile.post('/photos/:userId', validateUser, profileC.getPhotos);
profile.post('/addphoto/', validateUser, profileC.addPhoto);
profile.post('/', validateUser, profileC.getProfile);

export default profile;

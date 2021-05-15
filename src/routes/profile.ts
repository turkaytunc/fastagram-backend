import express from 'express';
import { validateUser } from '../middlewares';
import { profileControllers } from '../controllers';

const profile = express.Router();

profile.post('/:userId', validateUser, profileControllers.fetchUserPhotos);

export default profile;

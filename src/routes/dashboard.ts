import express from 'express';
import { validateUser } from '../middlewares';
import { dashboardC } from '../controllers';

const dashboard = express.Router();

dashboard.post('/', validateUser, dashboardC.dashboard);
dashboard.post('/feed', validateUser, dashboardC.getFeedItems);

export default dashboard;

import express from 'express';
import { validateUser } from '../middlewares';
import { dashboardControllers } from '../controllers';

const dashboard = express.Router();

dashboard.post('/', validateUser, dashboardControllers.dashboard);

export default dashboard;

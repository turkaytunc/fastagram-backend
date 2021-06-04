import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { HttpError } from './utils/HttpError';
import {
  authRoute,
  commentRoute,
  dashboardRoute,
  likeRoute,
  profileRoute,
  searchRoute,
} from './routes';
import { initializeDB } from './db/initializeDB';

const app = express();
let isInit = false;

app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://turkaytunc.github.io', '*'],
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
  })
);
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(morgan('dev'));

app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/comment', commentRoute);
app.use('/profile', profileRoute);
app.use('/search', searchRoute);
app.use('/like', likeRoute);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isInit === false) {
      await initializeDB();
      isInit = true;
      return res.json({ message: 'Initial configuration completed successfully!' });
    }
    return res.json({ message: 'Hello from express!' });
  } catch (error) {
    return next(error);
  }
});

// Unhandled Endpoint Error
app.get('/*', (req, res, next: NextFunction) => {
  const error = new HttpError('Page Not Found', 404);
  return next(error);
});

// Global Error Handler
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || 500;
  return res.status(status).json({
    message: error.message || 'An unexpected error occurred!',
  });
});

export default app;

import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { HttpError } from './utils/HttpError';
import { authRoutes, dashboardRoutes, profileRoutes } from './routes';
import { initializeDB } from './db/initializeDB';

const app = express();
let isInit = false;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/profile', profileRoutes);

app.get('/', async (req: Request, res: Response) => {
  if (isInit === false) {
    await initializeDB();
    isInit = true;
    return res.json({ message: 'Initial configuration completed successfully!' });
  }
  return res.json({ message: 'Hello from express!' });
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

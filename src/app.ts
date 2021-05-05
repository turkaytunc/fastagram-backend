import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { HttpError } from './utils/HttpError';
import { authRoutes, dashboardRoutes } from './routes';
import { initializeDB } from './db/initializeDB';

const app = express();
let isInit = false;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', async (req: any, res: { json: (arg0: { message: string }) => void }) => {
  if (isInit === false) {
    await initializeDB();
    isInit = true;
    return res.json({ message: 'Initial configuration completed successfully!' });
  }
  return res.json({ message: 'Hello from express!' });
});

// Unhandled Endpoint Error
app.get('/*', (req: any, res: any, next: any) => {
  const error = new HttpError('Page Not Found', 404);
  return next(error);
});

// Global Error Handler
app.use((error: any, req: any, res: any, next: any) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.status || 500);
  return res.json({
    message: error.message || 'An unexpected error occurred!',
  });
});

export default app;

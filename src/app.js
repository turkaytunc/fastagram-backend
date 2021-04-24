import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './routes/index.js';
import HttpError from './utils/HttpError.js';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'hello from express!' });
});

// Unhandled Endpoint
app.use('/*', (req, res, next) => {
  const error = new HttpError('Page Not Found', 404);
  next(error);
});

// Global Error Handle
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || 500;
  const message = error.message || 'An unexpected error occurred!';
  return res.status(status).json({ message });
});

export default app;

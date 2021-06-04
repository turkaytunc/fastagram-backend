import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import {
  authRoute,
  commentRoute,
  dashboardRoute,
  error404,
  globalError,
  init,
  likeRoute,
  profileRoute,
  searchRoute,
} from './routes';

const app = express();

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

app.get('/', init);

// Unhandled Endpoint Error
app.use('/*', error404);

// Global Error Handler
app.use(globalError);

export default app;

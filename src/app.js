import express from 'express';
import { authRoutes } from './routes/index.js';

const app = express();

app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'hello from express' });
});

export default app;

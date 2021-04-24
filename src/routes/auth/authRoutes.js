import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/login', async (req, res, next) => {
  try {
    const pass = await bcrypt.hash('hello', 12);
    return res.json({ message: 'auth/login', hash: pass });
  } catch (err) {
    return next(err);
  }
});

export default router;

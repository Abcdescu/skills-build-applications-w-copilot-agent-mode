import { Router } from 'express';
import User from '../models/user';

const router = Router();

// GET /api/users/ - list users
router.get('/', async (req, res) => {
  const users = await User.find().lean();
  res.json({ users });
});

// POST /api/users/ - create user
router.post('/', async (req, res) => {
  const u = new User(req.body);
  await u.save();
  res.status(201).json({ user: u });
});

export default router;

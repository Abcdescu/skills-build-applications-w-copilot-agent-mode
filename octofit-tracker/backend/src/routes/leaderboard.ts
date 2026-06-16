import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (req, res) => {
  const rows = await Leaderboard.find().lean();
  res.json({ leaderboard: rows });
});

export default router;

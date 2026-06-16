import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user team').lean();
  res.json({ activities });
});

router.post('/', async (req, res) => {
  const a = new Activity(req.body);
  await a.save();
  res.status(201).json({ activity: a });
});

export default router;

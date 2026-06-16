import express from 'express';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = Number(process.env.PORT || 8000);

// Codespaces-aware host and public URL
const IS_CODESPACE = Boolean(process.env.CODESPACE_NAME);
const HOST = IS_CODESPACE ? '0.0.0.0' : 'localhost';
const PUBLIC_URL = IS_CODESPACE
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://${HOST}:${PORT}`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('OctoFit Tracker backend running');
});

// Mount API routers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, HOST, () => {
      console.log(`Server listening on ${PUBLIC_URL}`);
      console.log(`Backend reachable at http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

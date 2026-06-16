/**
 * Seed the octofit_db database with test data
 *
 * This script populates users, teams, activities, workouts, and leaderboard
 */
import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import Leaderboard from '../models/leaderboard';

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Connecting to', MONGO);
  await mongoose.connect(MONGO);
  console.log('Connected. Clearing existing collections...');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  console.log('Inserting users...');
  const users = await User.insertMany([
    { name: 'Ava Johnson', email: 'ava@example.com' },
    { name: 'Liam Smith', email: 'liam@example.com' },
    { name: 'Maya Patel', email: 'maya@example.com' },
  ]);
  const uAva = users[0]!;
  const uLiam = users[1]!;
  const uMaya = users[2]!;

  console.log('Creating teams...');
  const teams = await Team.insertMany([
    { name: 'OctoRunners', members: [uAva._id, uLiam._id] },
    { name: 'SeaBikers', members: [uMaya._id] },
  ]);
  const tRunners = teams[0]!;
  const tBikers = teams[1]!;

  console.log('Adding activities...');
  const activities = await Activity.insertMany([
    { user: uAva._id, team: tRunners._id, type: 'run', durationMinutes: 35, distanceKm: 6.2, calories: 350 },
    { user: uLiam._id, team: tRunners._id, type: 'cycle', durationMinutes: 45, distanceKm: 20.5, calories: 520 },
    { user: uMaya._id, team: tBikers._id, type: 'swim', durationMinutes: 30, distanceKm: 1.1, calories: 290 },
  ]);

  console.log('Adding workouts...');
  const workouts = await Workout.insertMany([
    {
      user: uAva._id,
      name: 'Morning Strength',
      exercises: [
        { name: 'Push Ups', sets: 3, reps: 12 },
        { name: 'Plank', durationSeconds: 60 },
      ],
    },
    {
      user: uLiam._id,
      name: 'Evening Ride',
      exercises: [{ name: 'Stationary Bike', durationSeconds: 1800 }],
    },
  ]);

  console.log('Populating leaderboard...');
  await Leaderboard.insertMany([
    { entityType: 'user', entity: uAva._id, score: 1200, period: 'weekly' },
    { entityType: 'team', entity: tRunners._id, score: 2500, period: 'weekly' },
  ]);

  console.log('Seed complete. Inserted:', {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    workouts: workouts.length,
  });

  await mongoose.disconnect();
  console.log('Disconnected.');
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Seed the octofit_db database with test data
 *
 * This script populates users, teams, activities, workouts, and leaderboard
 */
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../database");
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const workout_1 = __importDefault(require("../models/workout"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
async function seed() {
    console.log('Connecting to', database_1.MONGO_URI);
    await (0, database_1.connectDatabase)();
    console.log('Connected. Clearing existing collections...');
    await Promise.all([
        user_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        activity_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({}),
    ]);
    console.log('Inserting users...');
    const users = await user_1.default.insertMany([
        { name: 'Ava Johnson', email: 'ava@example.com' },
        { name: 'Liam Smith', email: 'liam@example.com' },
        { name: 'Maya Patel', email: 'maya@example.com' },
    ]);
    const uAva = users[0];
    const uLiam = users[1];
    const uMaya = users[2];
    console.log('Creating teams...');
    const teams = await team_1.default.insertMany([
        { name: 'OctoRunners', members: [uAva._id, uLiam._id] },
        { name: 'SeaBikers', members: [uMaya._id] },
    ]);
    const tRunners = teams[0];
    const tBikers = teams[1];
    console.log('Adding activities...');
    const activities = await activity_1.default.insertMany([
        { user: uAva._id, team: tRunners._id, type: 'run', durationMinutes: 35, distanceKm: 6.2, calories: 350 },
        { user: uLiam._id, team: tRunners._id, type: 'cycle', durationMinutes: 45, distanceKm: 20.5, calories: 520 },
        { user: uMaya._id, team: tBikers._id, type: 'swim', durationMinutes: 30, distanceKm: 1.1, calories: 290 },
    ]);
    console.log('Adding workouts...');
    const workouts = await workout_1.default.insertMany([
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
    await leaderboard_1.default.insertMany([
        { entityType: 'user', entity: uAva._id, score: 1200, period: 'weekly' },
        { entityType: 'team', entity: tRunners._id, score: 2500, period: 'weekly' },
    ]);
    console.log('Seed complete. Inserted:', {
        users: users.length,
        teams: teams.length,
        activities: activities.length,
        workouts: workouts.length,
    });
    await mongoose_1.default.disconnect();
    console.log('Disconnected.');
}
seed().catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map
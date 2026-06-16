"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
// Codespaces-aware host and public URL
const IS_CODESPACE = Boolean(process.env.CODESPACE_NAME);
const HOST = IS_CODESPACE ? '0.0.0.0' : 'localhost';
const PUBLIC_URL = IS_CODESPACE
    ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
    : `http://${HOST}:${PORT}`;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('OctoFit Tracker backend running');
});
// Mount API routers
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
(0, database_1.connectDatabase)()
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
//# sourceMappingURL=index.js.map
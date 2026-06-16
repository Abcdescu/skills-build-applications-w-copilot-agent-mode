"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const rows = await leaderboard_1.default.find().lean();
    res.json({ leaderboard: rows });
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map
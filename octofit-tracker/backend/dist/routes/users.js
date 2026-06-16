"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
// GET /api/users/ - list users
router.get('/', async (req, res) => {
    const users = await user_1.default.find().lean();
    res.json({ users });
});
// POST /api/users/ - create user
router.post('/', async (req, res) => {
    const u = new user_1.default(req.body);
    await u.save();
    res.status(201).json({ user: u });
});
exports.default = router;
//# sourceMappingURL=users.js.map
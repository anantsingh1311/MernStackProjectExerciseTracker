// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user-model');

// POST /api/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful",username:user.username, userId: user._id });
});

module.exports = router;

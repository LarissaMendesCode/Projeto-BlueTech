const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

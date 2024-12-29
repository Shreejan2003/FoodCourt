const express = require('express');
const { addPoints } = require('../controllers/adminController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

// Admin login route
router.post('/login', adminAuthMiddleware, (req, res) => {
    res.status(200).json({ message: 'Admin logged in successfully', token: 'admin-hardcoded-token' });
});

// Admin-only route to add points
router.post('/add-points', adminAuthMiddleware, addPoints); // Use "/add-points" here

module.exports = router;

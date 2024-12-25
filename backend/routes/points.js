const express = require('express');
const { addPoints, deductPoints } = require('../controllers/pointsController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

// Add points (Admin only)
router.post('/add', adminAuthMiddleware, addPoints);

// Deduct points (Admin only for refunds or adjustments)
router.post('/deduct', adminAuthMiddleware, deductPoints);

module.exports = router;

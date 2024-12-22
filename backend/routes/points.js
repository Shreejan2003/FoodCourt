const express = require('express');
const { addPoints, deductPoints } = require('../controllers/pointsController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Add points (Admin only)
router.post('/add', authMiddleware, roleMiddleware(['admin']), addPoints);

// Deduct points (Admin only for refund or adjustments)
router.post('/deduct', authMiddleware, roleMiddleware(['admin']), deductPoints);

module.exports = router;

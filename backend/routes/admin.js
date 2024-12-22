const express = require('express');
const { addPoints } = require('../controllers/adminController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Admin-only route to add points
router.post('/add-points', roleMiddleware(['admin']), addPoints);

module.exports = router;

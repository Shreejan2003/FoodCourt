const express = require('express');
const {
    sendNotification,
    getUserNotifications,
    markAsRead,
} = require('../controllers/notificationController');

// Import `authMiddleware` and `adminAuthMiddleware`
const authMiddleware = require('../middlewares/authMiddleware');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

// Admin route to send a notification
router.post('/', adminAuthMiddleware, sendNotification);

// User routes
router.get('/', authMiddleware, getUserNotifications); // Use `authMiddleware` here
router.patch('/:id', authMiddleware, markAsRead); // Use `authMiddleware` here

module.exports = router;

const express = require('express');
const {
    sendNotification,
    getUserNotifications,
    markAsRead,
} = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', authMiddleware, sendNotification); // Authenticated: Send a notification
router.get('/:userId', authMiddleware, getUserNotifications); // Authenticated: Get notifications for a user
router.patch('/:id', authMiddleware, markAsRead); // Authenticated: Mark notification as read

module.exports = router;

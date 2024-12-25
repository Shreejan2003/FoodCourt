const express = require('express');
const {
    sendNotification,
    getUserNotifications,
    markAsRead,
} = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Authenticated routes for notifications
router.post('/', authMiddleware, sendNotification); // Authenticated: Send a notification
router.get('/', authMiddleware, getUserNotifications); // Authenticated: Get notifications for the authenticated user
router.patch('/:id', authMiddleware, markAsRead); // Authenticated: Mark a notification as read

module.exports = router;

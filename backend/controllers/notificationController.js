const Notification = require('../models/Notification');

// Send a notification
const sendNotification = async (req, res) => {
    try {
        const { user, message } = req.body;

        // Validate input
        if (!user || !message) {
            return res.status(400).json({ message: 'User ID and message are required.' });
        }

        const notification = new Notification({ user, message });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Error sending notification', error: error.message });
    }
};

// Get notifications for a user
const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error(`Error fetching notifications for userId ${req.params.userId}:`, error);
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate notification ID
        if (!id) {
            return res.status(400).json({ message: 'Notification ID is required.' });
        }

        const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: `Notification with ID ${id} not found.` });
        }

        res.status(200).json(notification);
    } catch (error) {
        console.error(`Error marking notification as read with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error marking notification as read', error: error.message });
    }
};

module.exports = {
    sendNotification,
    getUserNotifications,
    markAsRead,
};

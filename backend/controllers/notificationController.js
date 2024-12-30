const Notification = require('../models/Notification');

// Send a notification (Admin-only)
const sendNotification = async (req, res) => {
    try {
        const { userId, message } = req.body; // Consistent field names

        console.log("Send Notification Payload:", req.body);

        if (!userId || !message) {
            console.error("Missing userId or message in request body");
            return res.status(400).json({ message: 'User ID and message are required.' });
        }

        const notification = new Notification({ user: userId, message });
        await notification.save();

        console.log("Notification sent successfully:", notification);
        res.status(201).json({ success: true, notification });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Error sending notification', error: error.message });
    }
};

// Get notifications for the authenticated user
const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure authMiddleware adds req.user

        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error(`Error fetching notifications for userId ${req.user.id}:`, error);
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            console.error("Missing notification ID in request");
            return res.status(400).json({ message: 'Notification ID is required.' });
        }

        const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
        if (!notification) {
            console.error(`Notification with ID ${id} not found`);
            return res.status(404).json({ message: `Notification with ID ${id} not found.` });
        }

        console.log("Notification marked as read:", notification);
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

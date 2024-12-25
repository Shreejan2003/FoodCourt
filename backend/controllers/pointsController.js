const User = require('../models/User');

// Add points to a user's account
const addPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        // Validate input
        if (!userId || !points || typeof points !== 'number' || points <= 0) {
            return res.status(400).json({ message: 'Valid User ID and a positive points value are required.' });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: `User with ID ${userId} not found.` });
        }

        // Update points
        user.points += points;
        await user.save();

        res.status(200).json({ message: 'Points added successfully.', user });
    } catch (error) {
        console.error(`Error adding points for userId ${req.body.userId}:`, error);
        res.status(500).json({ message: 'Error adding points.', error: error.message });
    }
};

// Deduct points from a user's account
const deductPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        // Validate input
        if (!userId || !points || typeof points !== 'number' || points <= 0) {
            return res.status(400).json({ message: 'Valid User ID and a positive points value are required.' });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: `User with ID ${userId} not found.` });
        }

        // Check if user has sufficient points
        if (user.points < points) {
            return res.status(400).json({ message: 'Insufficient points for the transaction.' });
        }

        // Deduct points
        user.points -= points;
        await user.save();

        res.status(200).json({ message: 'Points deducted successfully.', user });
    } catch (error) {
        console.error(`Error deducting points for userId ${req.body.userId}:`, error);
        res.status(500).json({ message: 'Error deducting points.', error: error.message });
    }
};

module.exports = {
    addPoints,
    deductPoints,
};

const User = require('../models/User');

// Add points to a user's account
const addPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        if (!userId || !points) {
            return res.status(400).json({ message: 'User ID and points are required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.points += points;
        await user.save();

        res.status(200).json({ message: 'Points added successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error adding points', error });
    }
};

// Deduct points from a user's account
const deductPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        if (!userId || !points) {
            return res.status(400).json({ message: 'User ID and points are required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.points < points) {
            return res.status(400).json({ message: 'Insufficient points' });
        }

        user.points -= points;
        await user.save();

        res.status(200).json({ message: 'Points deducted successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error deducting points', error });
    }
};

module.exports = {
    addPoints,
    deductPoints,
};

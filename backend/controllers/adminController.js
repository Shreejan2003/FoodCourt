const User = require('../models/User');

// Admin adds points to a user's account
const addPoints = async (req, res) => {
    const { userId, points } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.points += points; // Add points to user's balance
        await user.save();

        res.status(200).json({ message: 'Points added successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error adding points', error });
    }
};

module.exports = { addPoints };

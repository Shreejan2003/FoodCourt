const User = require('../models/User');

// Admin adds points to a user's account
const addPoints = async (req, res) => {
    const { userId, points } = req.body;

    // Validate input
    if (!userId || !points || typeof points !== 'number' || points <= 0) {
        return res.status(400).json({ message: 'Invalid input. Please provide a valid userId and positive points value.' });
    }

    try {
        // Log the request body
        console.log('Request Body:', req.body);

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            console.log(`User with ID ${userId} not found`);
            return res.status(404).json({ message: `User with ID ${userId} not found` });
        }

        // Log user details before update
        console.log('User Before Update:', user);

        // Update user's points
        user.points += points;
        await user.save();

        // Log user details after update
        console.log('User After Update:', user);

        res.status(200).json({ message: 'Points added successfully', user });
    } catch (error) {
        console.error(`Error adding points for userId ${userId}:`, error);
        res.status(500).json({ message: 'Error adding points', error: error.message });
    }
};

module.exports = { addPoints };

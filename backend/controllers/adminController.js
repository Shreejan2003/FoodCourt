const User = require('../models/User');
const Joi = require('joi');

// Admin adds points to a user's account
const addPoints = async (req, res) => {
    // Define schema for input validation
    const schema = Joi.object({
        userId: Joi.string().required().messages({
            'string.empty': 'User ID is required.',
            'any.required': 'User ID is required.',
        }),
        points: Joi.number().positive().required().messages({
            'number.positive': 'Points must be a positive number.',
            'any.required': 'Points are required.',
        }),
    });

    // Validate request body against schema
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { userId, points } = value;

    try {
        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            console.warn(`User with ID ${userId} not found`);
            return res.status(404).json({ message: `User with ID ${userId} not found` });
        }

        // Update user's points
        user.points += points;
        await user.save();

        console.info(`Points added successfully to user ${userId}. New points: ${user.points}`);

        res.status(200).json({
            message: 'Points added successfully',
            user: {
                id: user._id,
                username: user.username,
                points: user.points,
            },
        });
    } catch (error) {
        console.error(`Error adding points for userId ${userId}:`, error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { addPoints };

const express = require('express');
const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserInfo, // Ensure this is defined and imported
} = require('../controllers/userController'); // Import functions from the correct path

const authMiddleware = require('../middlewares/authMiddleware');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser); // Register user
router.post('/login', loginUser);       // Login user

// Admin-only route
router.get('/', adminAuthMiddleware, getAllUsers); // Get all users (Admin only)

// Protected route to get logged-in user's info
router.get('/me', authMiddleware, getUserInfo); // Ensure this callback is defined and imported

module.exports = router;

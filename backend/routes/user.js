const express = require('express');
const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserInfo, // Ensure this is defined and imported
} = require('../controllers/userController'); // Import functions from the correct path
const { addPoints } = require('../controllers/adminController'); // Add import for addPoints function

const authMiddleware = require('../middlewares/authMiddleware');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser); // Register user
router.post('/login', loginUser);       // Login user

// Admin-only routes
router.get('/', adminAuthMiddleware, getAllUsers); // Get all users (Admin only)
router.post('/add-points', adminAuthMiddleware, addPoints); // Add points to user (Admin only)

// Protected route to get logged-in user's info
router.get('/me', authMiddleware, getUserInfo); // Get user info for logged-in user

module.exports = router;

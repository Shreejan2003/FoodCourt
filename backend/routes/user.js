const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // Login user

// Admin-only routes
router.get('/', adminAuthMiddleware, getAllUsers); // Get all users (Admin only)

module.exports = router;

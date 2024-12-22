const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Routes
router.post('/register', registerUser); // Public: Register a new user
router.post('/login', loginUser); // Public: Login user

module.exports = router;

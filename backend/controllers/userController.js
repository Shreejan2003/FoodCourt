const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields (username, email, password) are required.' });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user.', error: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Login request body:", req.body); // Log the incoming request
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      console.log("User found:", user); // Log the user from the database
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // Validate the password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match result:", isMatch); // Log the result of password validation
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      console.log("Generated Token:", token); // Log the generated token
  
      res.status(200).json({ token, user: { id: user._id, email: user.email, username: user.username } });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ message: "Server error during login." });
    }
  };
  

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('username points createdAt'); // Fetch required fields
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Error fetching users.', error: error.message });
    }
};

// Controller for fetching logged-in user's info
const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user info:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserInfo,
};

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan'); // Add morgan for request logging

// Environment variables setup
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Log HTTP requests for debugging

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/menu', require('./routes/menu')); // Menu routes
app.use('/api/admin', require('./routes/admin')); // Admin routes
app.use('/api/orders', require('./routes/order')); // Order routes
app.use('/api/auth', require('./routes/auth')); // Auth routes (login and registration)
app.use('/api/user', require('./routes/user')); // User routes (e.g., points management)
app.use('/api/points', require('./routes/points')); // Points routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running successfully' });
});

// Error handling middleware (keep at the end)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

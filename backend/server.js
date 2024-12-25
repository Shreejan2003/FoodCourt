const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON requests
app.use(morgan('dev')); // Log HTTP requests

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', require('./routes/user')); // User-related routes
app.use('/api/menu', require('./routes/menu')); // Menu-related routes
app.use('/api/admin', require('./routes/admin')); // Admin-related routes
app.use('/api/orders', require('./routes/order')); // Order-related routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/points', require('./routes/points')); // Points-related routes
app.use('/api/analytics', require('./routes/analytics')); // Analytics routes
app.use('/api/notifications', require('./routes/notification')); // Notification routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running successfully' });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

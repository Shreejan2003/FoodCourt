const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config');
const errorHandler = require('./middlewares/errorHandler');

// Custom CORS options
const corsOptions = {
    origin: '*', // Update with specific origins for production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URI || !process.env.PORT) {
    console.error('Missing required environment variables. Check .env file.');
    process.exit(1);
}

// Initialize Express app
const app = express();

// Middleware
app.use(cors(corsOptions)); // Enable CORS with custom options
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

// Debug: Log all registered routes
app._router.stack.forEach((layer) => {
    if (layer.route) {
        console.log('Route:', layer.route.path);
    } else if (layer.name === 'router') {
        layer.handle.stack.forEach((nestedLayer) => {
            if (nestedLayer.route) {
                console.log('Route:', nestedLayer.route.path);
            }
        });
    }
});

// Error handling middleware
app.use(errorHandler);

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

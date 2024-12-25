const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Extract Authorization header
        const authHeader = req.headers.authorization;

        // Validate header presence and format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.error('Authorization header missing or malformed');
            return res.status(401).json({ message: 'Unauthorized: Missing or malformed token' });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user data to request object
        req.user = decoded;

        // Proceed to the next middleware/handler
        next();
    } catch (error) {
        // Handle token verification errors
        if (error.name === 'TokenExpiredError') {
            console.error('Token expired:', error.message);
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }

        if (error.name === 'JsonWebTokenError') {
            console.error('Invalid token:', error.message);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Catch any other errors
        console.error('Error verifying token:', error.message);
        res.status(500).json({ message: 'Internal server error during token verification' });
    }
};

module.exports = authMiddleware;

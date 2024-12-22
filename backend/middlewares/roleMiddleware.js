const jwt = require('jsonwebtoken');

const roleMiddleware = (roles, pointsManagement = false) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

        // Check if token exists
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if the user's role is allowed
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden: Access denied' });
            }

            // Attach decoded user info to the request
            req.user = decoded;

            // Additional logic for points management
            if (pointsManagement) {
                // Ensure the current user is an admin to manage points
                if (decoded.role !== 'admin') {
                    return res.status(403).json({ message: 'Forbidden: Only admins can manage points' });
                }
                // Ensure the request body contains required fields for points management
                const { userId, points } = req.body;
                if (!userId || points === undefined) {
                    return res.status(400).json({ message: 'Bad Request: userId and points are required' });
                }

                // Attach points info to the request for further processing in the controller
                req.pointsManagement = { userId, points };
            }

            // Continue to the next middleware or route
            next();
        } catch (error) {
            // Handle invalid or expired tokens
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    };
};

module.exports = roleMiddleware;

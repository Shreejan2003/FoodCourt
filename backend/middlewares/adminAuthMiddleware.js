const adminAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from the header

    // Check if the token matches the hardcoded admin token
    if (token === 'admin-hardcoded-token') {
        return next(); // Proceed if the token is valid
    }

    // Respond with 401 if the token is invalid
    res.status(401).json({ message: 'Unauthorized: Invalid admin credentials' });
};

module.exports = adminAuthMiddleware;

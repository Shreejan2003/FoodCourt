const adminAuthMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    console.log("Authorization Header:", authorizationHeader); // Log the header

    const token = authorizationHeader?.split(' ')[1]; // Extract token from the header
    console.log("Extracted Token:", token); // Log the extracted token

    // Check if the token matches the hardcoded admin token
    if (token === 'admin-hardcoded-token') {
        console.log("Admin authentication successful");
        return next(); // Proceed if the token is valid
    }

    console.log("Unauthorized access attempt with token:", token);
    res.status(401).json({ message: 'Unauthorized: Invalid admin credentials' }); // Respond with 401 if the token is invalid
};

module.exports = adminAuthMiddleware;

const adminAuthMiddleware = (req, res, next) => {
    // Ensure the request body is defined
    if (!req.body) {
        console.error("Request body is undefined");
        return res.status(400).json({ message: "Bad Request: Missing request body" });
    }

    const { username, password } = req.body;

    // Fixed admin credentials
    if (username === "admin" && password === "admin@123") {
        req.isAdmin = true; // Attach admin status to the request
        return next();
    }

    return res.status(401).json({ message: "Unauthorized: Invalid admin credentials" });
};

module.exports = adminAuthMiddleware;

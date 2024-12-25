const validateUserRequest = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing "username".' });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid or missing "email".' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    next();
};

module.exports = validateUserRequest;

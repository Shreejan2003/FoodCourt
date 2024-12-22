const validateMenuRequest = (req, res, next) => {
    const { name, price } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing "name" field.' });
    }

    if (!price || typeof price !== 'number') {
        return res.status(400).json({ message: 'Invalid or missing "price" field.' });
    }

    next(); // Proceed to the next middleware or route handler
};

module.exports = validateMenuRequest;

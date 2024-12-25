const validateMenuRequest = (req, res, next) => {
    const { name, price, availability, description, category, menuType } = req.body;

    // Validate name
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing "name" field. It must be a non-empty string.' });
    }

    // Validate price
    if (price === undefined || typeof price !== 'number' || price < 0) {
        return res.status(400).json({ message: 'Invalid or missing "price" field. It must be a non-negative number.' });
    }

    // Validate availability (optional field)
    if (availability !== undefined && typeof availability !== 'boolean') {
        return res.status(400).json({ message: '"availability" must be a boolean if provided.' });
    }

    // Validate description (optional field)
    if (description !== undefined && typeof description !== 'string') {
        return res.status(400).json({ message: '"description" must be a string if provided.' });
    }

    // Validate category (optional field)
    if (category !== undefined && typeof category !== 'string') {
        return res.status(400).json({ message: '"category" must be a string if provided.' });
    }

    // Validate menuType
    if (!menuType || typeof menuType !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing "menuType" field. It must be a non-empty string.' });
    }

    // Proceed to the next middleware or route handler
    next();
};

module.exports = validateMenuRequest;

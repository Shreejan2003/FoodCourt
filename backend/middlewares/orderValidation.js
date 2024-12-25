const validateOrderRequest = (req, res, next) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Order items are required and must be an array.' });
    }

    const invalidItem = items.find(
        (item) => !item.menuItemId || typeof item.menuItemId !== 'string' || !item.quantity || typeof item.quantity !== 'number'
    );

    if (invalidItem) {
        return res.status(400).json({ message: 'Each item must have a valid "menuItemId" and a numeric "quantity".' });
    }

    next();
};

module.exports = validateOrderRequest;

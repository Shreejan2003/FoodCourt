const validateOrderRequest = (req, res, next) => {
    const { items } = req.body;

    console.log("Validating order request:", items); // Log the input

    if (!items || !Array.isArray(items) || items.length === 0) {
        console.error("Validation failed: 'items' is invalid.");
        return res.status(400).json({ message: 'Order items are required and must be an array.' });
    }

    const invalidItem = items.find(
        (item) => 
            !item.menuItemId || 
            typeof item.menuItemId !== 'string' || 
            !item.quantity || 
            typeof item.quantity !== 'number'
    );

    if (invalidItem) {
        console.error("Validation failed for item:", invalidItem); // Log the problematic item
        return res.status(400).json({ message: 'Each item must have a valid "menuItemId" and a numeric "quantity".' });
    }

    console.log("Validation passed.");
    next(); // Proceed to the next middleware or controller
};

module.exports = validateOrderRequest;

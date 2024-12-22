const User = require('../models/User');
const Order = require('../models/Order');

// Place an order with points or cash
const placeOrder = async (req, res) => {
    const { items, paymentMethod } = req.body;
    const userId = req.user.id; // Authenticated user's ID

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Calculate total price
        const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        // Handle payment with points
        let pointsUsed = 0;
        if (paymentMethod === 'points') {
            if (user.points < totalPrice) {
                return res.status(400).json({ message: 'Insufficient points' });
            }
            pointsUsed = totalPrice;
            user.points -= pointsUsed; // Deduct points
            await user.save();
        }

        // Create order
        const order = new Order({
            userId,
            items,
            totalPrice,
            paymentMethod,
            pointsUsed
        });

        await order.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
};

module.exports = { placeOrder };

const User = require('../models/User');
const Order = require('../models/Order');
const Menu = require('../models/Menu');

// Place an order with points
const placeOrder = async (req, res) => {
    const { items } = req.body;
    const userId = req.user.id; // Authenticated user's ID

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Order items are required and must be an array.' });
    }

    try {
        // Validate and fetch user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Fetch menu items and validate against the request
        const menuItemIds = items.map(item => item.menuItemId);
        const menuItems = await Menu.find({ _id: { $in: menuItemIds } });

        if (menuItems.length !== items.length) {
            return res.status(400).json({ message: 'Some menu items are invalid or unavailable.' });
        }

        // Calculate total price
        const totalPrice = items.reduce((acc, item) => {
            const menuItem = menuItems.find(menu => menu.id === item.menuItemId);
            if (!menuItem) {
                throw new Error(`Menu item with ID ${item.menuItemId} not found.`);
            }
            return acc + menuItem.price * item.quantity;
        }, 0);

        // Check if user has sufficient points
        if (user.points < totalPrice) {
            return res.status(400).json({ message: 'Insufficient points to place the order.' });
        }

        // Deduct points and save user
        user.points -= totalPrice;
        await user.save();

        // Create order
        const order = new Order({
            userId,
            items,
            totalPrice,
            paymentMethod: 'points',
            pointsUsed: totalPrice,
        });
        await order.save();

        res.status(201).json({ message: 'Order placed successfully.', order });
    } catch (error) {
        console.error(`Error placing order for userId ${userId}:`, error.message);
        res.status(500).json({ message: 'Error placing order.', error: error.message });
    }
};

// Get user order history
const getUserOrderHistory = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('items.menuItemId');
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching order history:', error.message);
        res.status(500).json({ message: 'Error fetching order history', error: error.message });
    }
};

// Analytics: Get most popular menu items
const getPopularMenuItems = async (req, res) => {
    try {
        const popularItems = await Order.aggregate([
            { $unwind: '$items' },
            { $group: { _id: '$items.menuItemId', count: { $sum: '$items.quantity' } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $lookup: { from: 'menus', localField: '_id', foreignField: '_id', as: 'menuItem' } },
            { $unwind: '$menuItem' },
            { $project: { name: '$menuItem.name', count: 1 } },
        ]);

        res.status(200).json({ success: true, data: popularItems });
    } catch (error) {
        console.error('Error fetching popular menu items:', error.message);
        res.status(500).json({ message: 'Error fetching popular menu items.', error: error.message });
    }
};

// Analytics: Get total orders count
const getTotalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        res.status(200).json({ success: true, totalOrders });
    } catch (error) {
        console.error('Error fetching total orders:', error.message);
        res.status(500).json({ message: 'Error fetching total orders.', error: error.message });
    }
};

// Analytics: Get active vs inactive menu count
const getMenuStatus = async (req, res) => {
    try {
        const activeMenus = await Menu.countDocuments({ availability: true });
        const inactiveMenus = await Menu.countDocuments({ availability: false });

        res.status(200).json({ success: true, data: { activeMenus, inactiveMenus } });
    } catch (error) {
        console.error('Error fetching menu status:', error.message);
        res.status(500).json({ message: 'Error fetching menu status.', error: error.message });
    }
};

module.exports = {
    placeOrder,
    getUserOrderHistory,
    getPopularMenuItems,
    getTotalOrders,
    getMenuStatus,
};

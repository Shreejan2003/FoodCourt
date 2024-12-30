const User = require('../models/User');
const Order = require('../models/Order');
const Menu = require('../models/Menu');

// Log the Order model for debugging
console.log("Order Model Loaded:", Order);

// Place an order
const placeOrder = async (req, res) => {
    const { items } = req.body;
    const userId = req.user.id;

    console.log("Received order request:", { userId, items });

    if (!items || !Array.isArray(items) || items.length === 0 || !items.every(item => item.menuItemId && item.quantity > 0)) {
        return res.status(400).json({ message: "Invalid order items. Each item must have a valid menuItemId and quantity > 0." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const menuItemIds = items.map((item) => item.menuItemId);
        const menuItems = await Menu.find({ _id: { $in: menuItemIds } });

        if (menuItems.length !== menuItemIds.length) {
            return res.status(400).json({ message: "Some menu items are invalid or unavailable." });
        }

        const totalPrice = items.reduce((acc, item) => {
            const menuItem = menuItems.find((menu) => menu._id.toString() === item.menuItemId);
            if (!menuItem) {
                throw new Error(`Menu item with ID ${item.menuItemId} not found.`);
            }
            return acc + menuItem.price * item.quantity;
        }, 0);

        if (user.points < totalPrice) {
            return res.status(400).json({ message: "Insufficient points to place the order." });
        }

        user.points -= totalPrice;
        await user.save();

        const order = new Order({
            userId,
            items,
            totalPrice,
            paymentMethod: "points",
            pointsUsed: totalPrice,
        });
        await order.save();

        console.log("Order placed successfully:", order);
        res.status(201).json({ message: "Order placed successfully.", order });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ message: "Error placing order.", error: error.message });
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

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('items.menuItemId userId');
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching all orders:', error.message);
        res.status(500).json({ message: 'Error fetching all orders.', error: error.message });
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

// Get total orders count of the day
const getTotalOrdersOfDay = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const totalOrders = await Order.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });

        res.status(200).json({ success: true, totalOrders });
    } catch (error) {
        console.error('Error fetching total orders of the day:', error.message);
        res.status(500).json({ message: 'Error fetching total orders of the day', error: error.message });
    }
};

// Get active vs inactive menu count
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

// Delete an order (Mark as Received)
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Order ID is required.' });
        }

        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: `Order with ID ${id} not found.` });
        }

        res.status(200).json({ success: true, message: 'Order marked as received and deleted successfully.', data: deletedOrder });
    } catch (error) {
        console.error(`Error deleting order with ID ${req.params.id}:`, error.message);
        res.status(500).json({ success: false, message: 'Error deleting order.', error: error.message });
    }
};

module.exports = {
    placeOrder,
    getUserOrderHistory,
    getAllOrders,
    getPopularMenuItems,
    getTotalOrdersOfDay,
    getMenuStatus,
    deleteOrder,
};

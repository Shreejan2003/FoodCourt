const Order = require('../models/Order');
const Menu = require('../models/Menu');

// Get most popular menu items
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

// Get total orders count
const getTotalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        res.status(200).json({ success: true, totalOrders });
    } catch (error) {
        console.error('Error fetching total orders:', error.message);
        res.status(500).json({ message: 'Error fetching total orders.', error: error.message });
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

module.exports = {
    getPopularMenuItems,
    getTotalOrders,
    getMenuStatus,
};

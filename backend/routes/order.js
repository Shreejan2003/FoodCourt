const express = require('express');
const {
    placeOrder,
    getUserOrderHistory,
    getAllOrders,
    getPopularMenuItems,
    getTotalOrdersOfDay,
    getMenuStatus,
    deleteOrder, 
} = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');
const validateOrderRequest = require('../middlewares/orderValidation');

const router = express.Router();

// User Routes
router.post('/place', authMiddleware, validateOrderRequest, placeOrder); // Place an order
router.get('/history', authMiddleware, getUserOrderHistory); // Get order history

// Admin Routes
router.get('/all', adminAuthMiddleware, getAllOrders); // Fetch all orders
router.delete('/:id', adminAuthMiddleware, deleteOrder); // Mark as received (delete order)

// Analytics Routes (Admin Only)
router.get('/analytics/popular-menu-items', adminAuthMiddleware, getPopularMenuItems); // Most popular menu items
router.get('/analytics/total-orders-day', adminAuthMiddleware, getTotalOrdersOfDay); // Total orders for the day
router.get('/analytics/menu-status', adminAuthMiddleware, getMenuStatus); // Active vs inactive menus

module.exports = router;

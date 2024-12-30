const express = require('express');
const {
    getPopularMenuItems,
    getTotalOrdersOfDay,
    getMenuStatus,
} = require('../controllers/orderController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

// Analytics routes (Admin only)
router.get('/analytics/popular-menu-items', adminAuthMiddleware, getPopularMenuItems);
router.get('/analytics/total-orders-day', adminAuthMiddleware, getTotalOrdersOfDay);
router.get('/analytics/menu-status', adminAuthMiddleware, getMenuStatus);

module.exports = router;

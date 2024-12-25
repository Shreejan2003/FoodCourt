const express = require('express');
const {
    getPopularMenuItems,
    getTotalOrders,
    getMenuStatus,
} = require('../controllers/orderController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

// Analytics routes (Admin only)
router.get('/popular-menu-items', adminAuthMiddleware, getPopularMenuItems);
router.get('/total-orders', adminAuthMiddleware, getTotalOrders);
router.get('/menu-status', adminAuthMiddleware, getMenuStatus);

module.exports = router;

const express = require('express');
const { placeOrder, getUserOrderHistory } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateOrderRequest = require('../middlewares/orderValidation');

const router = express.Router();

// Place an order
router.post('/place', authMiddleware, validateOrderRequest, placeOrder); // Add '/place'

// Get order history
router.get('/history', authMiddleware, getUserOrderHistory);

module.exports = router;

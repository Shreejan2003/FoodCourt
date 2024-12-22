const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Place an order
router.post('/', authMiddleware, placeOrder);

module.exports = router;

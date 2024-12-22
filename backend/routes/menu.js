const express = require('express');
const {
    getAllMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuController');
const roleMiddleware = require('../middlewares/roleMiddleware'); // For role-based access control

const router = express.Router();

// Routes
router.get('/', getAllMenuItems); // Public: Get all menu items
router.post('/', roleMiddleware(['Admin']), addMenuItem); // Admin: Add a new menu item
router.put('/:id', roleMiddleware(['Admin']), updateMenuItem); // Admin: Update a menu item
router.delete('/:id', roleMiddleware(['Admin']), deleteMenuItem); // Admin: Delete a menu item

module.exports = router;

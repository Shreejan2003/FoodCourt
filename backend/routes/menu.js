const express = require("express");
const {
    getAllMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleMenuItemAvailability,
} = require("../controllers/menuController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAllMenuItems); // Public: Get all menu items

// Admin-only routes
router.post("/", adminAuthMiddleware, addMenuItem); // Admin: Add a new menu item
router.put("/:id", adminAuthMiddleware, updateMenuItem); // Admin: Update a menu item
router.delete("/:id", adminAuthMiddleware, deleteMenuItem); // Admin: Delete a menu item
router.patch("/:id/toggle", adminAuthMiddleware, toggleMenuItemAvailability); // Admin: Toggle availability

module.exports = router;

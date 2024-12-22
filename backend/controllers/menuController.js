const Menu = require('../models/Menu');

// Get all menu items
const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items', error });
    }
};

// Add a new menu item
const addMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, menuType, availability } = req.body;
        const newMenuItem = new Menu({ name, description, price, category, menuType, availability });
        await newMenuItem.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding menu item', error });
    }
};

// Update a menu item
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedMenuItem = await Menu.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating menu item', error });
    }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMenuItem = await Menu.findByIdAndDelete(id);
        if (!deletedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting menu item', error });
    }
};

module.exports = {
    getAllMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
};

const Menu = require('../models/Menu');

// Get all menu items
const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Error fetching menu items', error: error.message });
    }
};

// Add a new menu item
const addMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, menuType, availability } = req.body;

        // Input validation
        if (!name || !price || !menuType) {
            return res.status(400).json({ message: 'Name, price, and menu type are required.' });
        }

        const newMenuItem = new Menu({ name, description, price, category, menuType, availability });
        await newMenuItem.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ message: 'Error adding menu item', error: error.message });
    }
};

// Update a menu item
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Validate input fields
        if (!updates) {
            return res.status(400).json({ message: 'No update data provided.' });
        }

        const updatedMenuItem = await Menu.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedMenuItem) {
            return res.status(404).json({ message: `Menu item with ID ${id} not found.` });
        }

        res.status(200).json(updatedMenuItem);
    } catch (error) {
        console.error(`Error updating menu item with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error updating menu item', error: error.message });
    }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMenuItem = await Menu.findByIdAndDelete(id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: `Menu item with ID ${id} not found.` });
        }

        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error(`Error deleting menu item with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error deleting menu item', error: error.message });
    }
};

// Toggle availability of a menu item
const toggleMenuItemAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await Menu.findById(id);
        if (!menuItem) {
            return res.status(404).json({ message: `Menu item with ID ${id} not found.` });
        }

        menuItem.availability = !menuItem.availability; // Toggle availability
        await menuItem.save();

        res.status(200).json({ message: 'Menu item availability toggled successfully', menuItem });
    } catch (error) {
        console.error(`Error toggling availability for menu item with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error toggling menu item availability', error: error.message });
    }
};

module.exports = {
    getAllMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleMenuItemAvailability,
};

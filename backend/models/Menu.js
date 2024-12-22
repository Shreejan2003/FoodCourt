const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Tea", "Dal Bhat"
    description: String,                   // e.g., "Nepali breakfast option"
    price: { type: Number, required: true }, // e.g., 20, 120
    category: String,                      // e.g., "Hot Drinks", "Main Course"
    menuType: { type: String, required: true }, // e.g., "Breakfast", "Lunch", "Dinner"
    availability: { type: Boolean, default: true }, // true if available
    createdAt: { type: Date, default: Date.now } // Automatically set creation time
});

module.exports = mongoose.model('Menu', MenuSchema);

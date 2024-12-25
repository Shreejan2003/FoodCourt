const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    menuType: { type: String, required: true },
    availability: { type: Boolean, default: true }, // Toggle field
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Menu', MenuSchema);

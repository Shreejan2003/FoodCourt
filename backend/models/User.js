const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password for authentication
    role: { type: String, enum: ['admin', 'user'], required: true },
    points: { type: Number, default: 0 }, // Points available for payment
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);

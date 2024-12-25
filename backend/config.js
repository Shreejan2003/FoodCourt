const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Optional: Set strictQuery to avoid deprecation warnings
        mongoose.set("strictQuery", true);

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        });

        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes"); // Import your auth routes

// const app = express();

// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// const MONGO_URI = "mongodb://127.0.0.1:27017/yogaDB"; 
// mongoose.connect(MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch(err => console.error("❌ MongoDB connection error:", err));

// // Mount routes under /auth
// app.use("/auth", authRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Sample route to check if the backend is working
app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

// Export the app for Vercel
module.exports = app;

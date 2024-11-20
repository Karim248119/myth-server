const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const mythologyRoutes = require("./routes/mythologyRoutes");
const characterRoutes = require("./routes/characterRoutes");
const sectionRoutes = require("./routes/sectionRoutes");

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Allow all origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/mythologies", mythologyRoutes);
app.use("/api/mythologies", characterRoutes);
app.use("/api/mythologies", sectionRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    // Start the server after DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err.message);
  });

module.exports = app;

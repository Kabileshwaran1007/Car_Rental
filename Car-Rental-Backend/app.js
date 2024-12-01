const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = process.env.PORT || 5050;
require('dotenv').config();
// MongoDB connection
const MONGODB_URL = process.env.MONGODB_URL;
// MongoDB connection
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connection successful...");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Import and use routes

const bookings = require('./routes/BookingRoutes');
const userRoutes = require('./routes/UserRoutes');
app.use('/api', userRoutes);
app.use('/api',bookings);
app.use('/',"hello world this is car rendal project");
// const productRoutes = require('./routes/ProductRoutes');
// app.use(productRoutes);

const verifyToken = require("./middleware/AuthMiddleware");

// Unprotected route
app.get("/unprotected", (req, res) => {
    res.status(200).send("This is an unprotected API");
});

// Protected route
app.get("/protected", verifyToken, (req, res) => {
    res.status(200).send("This is a protected API");
});

// Server startup
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

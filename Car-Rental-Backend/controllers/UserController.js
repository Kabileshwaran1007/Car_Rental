// controllers/userController.js
const User = require('../models/user');  // Assuming you have a User model
const bcrypt = require('bcrypt');

// User registration function
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists by username or email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User or email already exists" });
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error during registration", error: err.message });
    }
};

// User login function
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("User details ==>", username, password);
        console.log("response ===>", res);
        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check password (compare hashed password using bcrypt)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Send user ID in the response message
        // res.status(200).json({ message: `Login successful, User ID: ${user._id}` });
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error during login", error: err.message });
    }
};


// Get all users (for testing or admin use)
const userslist = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
};

module.exports = { register, login, userslist };

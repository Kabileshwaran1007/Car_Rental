// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');  // Correct path

// Route for user registration
router.post('/register', userController.register);

// Route for user login
router.post('/login', userController.login);

// Route for getting all users (for testing/admin)
router.get('/users', userController.userslist);

module.exports = router;

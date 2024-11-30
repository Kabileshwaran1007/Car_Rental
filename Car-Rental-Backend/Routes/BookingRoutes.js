const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingController');

// Route to create a booking
router.post('/bookings', bookingController.createBooking);

// Route to get all bookings for a user
router.get('/bookings/user', bookingController.getAllUsers);

router.get('/confirmpayment', bookingController.confirmPayment);

router.get('/bookings/user/:userId', bookingController.getUserById);
module.exports = router;

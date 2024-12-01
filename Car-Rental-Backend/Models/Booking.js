const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  carType: {
    type: String,
    required: true
  },
  pickUp: {
    type: String,
    required: true
  },
  dropOff: {
    type: String,
    required: true
  },
  pickTime: {
    type: Date,
    required: true
  },
  dropTime: {
    type: Date,
    required: true
  },
  userDetails: {
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zipcode: {
      type: String,
      required: true
    }
  },
  totalCost: {
    type: Number,
    required: true
  },
  // Reference to User model for one-to-many relationship
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentSessionId: String,
  status: { type: String, default: 'Payment Successful' }
}, { timestamps: true });


const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

module.exports = Booking;
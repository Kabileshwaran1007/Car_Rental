const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'  
  }]
});

// Check if the model already exists in the registry
const User = mongoose.model('User', userSchema);

module.exports = User;


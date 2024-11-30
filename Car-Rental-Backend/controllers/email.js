    // email.js
const nodemailer = require("nodemailer");
require('dotenv').config(); // Load environment variables

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail', // or other service like 'outlook', 'yahoo'
    auth: {
        user: process.env.EMAIL_USER, // Your email from .env
        pass: process.env.EMAIL_PASS, // Your email password from .env
    },
});

const sendConfirmationEmail = (userInfo) => {
    const { name, email, carType, pickUp, dropOff, pickTime, dropTime } = userInfo;
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: email, // Recipient address
        subject: 'Car Booking Confirmation', // Subject line
        text: `Hello ${name},

Your car booking has been confirmed.

Car Type: ${carType}
Pick-Up Location: ${pickUp}
Drop-Off Location: ${dropOff}
Pick-Up Time: ${pickTime}
Drop-Off Time: ${dropTime}

Thank you for choosing our service!`, // Plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error while sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

module.exports = { sendConfirmationEmail };
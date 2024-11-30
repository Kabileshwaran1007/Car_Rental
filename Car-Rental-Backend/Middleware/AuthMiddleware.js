const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Split to remove 'Bearer ' prefix

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    // Use the secret key stored in environment variable
    const secretKey = process.env.JWT_SECRET || 'this-can-be-any-random-key';

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Attach the decoded user ID to the request object
        req.userId = decoded.userId;
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = verifyToken;

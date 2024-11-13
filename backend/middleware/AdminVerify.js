import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify admin by checking the email in the token
export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the email matches the admin email in environment variables
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Forbidden: Admin access only' });
    }

    next(); // Allow access if the email matches the admin's email
  } catch (error) {
    console.error("Admin Verification Error:", error);
    res.status(403).json({ message: 'Invalid token', error });
  }
};

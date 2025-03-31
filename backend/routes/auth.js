import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const router = express.Router();

// Consumer Login
router.post('/login', async (req, res) => {
  try {
    const { consumer_num, password } = req.body;

    // Find user by consumer number
    const user = await User.findOne({ consumer_num });
    if (!user) {
      return res.status(401).json({ message: 'Invalid consumer number or password' });
    }

    // Check password (plain text comparison)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid consumer number or password' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        consumer_num: user.consumer_num,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 
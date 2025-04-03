import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Admin from '../models/Admin.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { adminId, password } = req.body;
    
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        adminId: admin.adminId,
        name: admin.name
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new user
router.post('/users', auth, async (req, res) => {
  try {
    const { consumer_num, first_name, last_name, phone, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      consumer_num,
      first_name,
      last_name,
      phone,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user statistics
router.get('/user-stats', auth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    
    // Get user distribution by type
    const userDistribution = await Promise.all([
      User.countDocuments({ userType: 'residential' }),
      User.countDocuments({ userType: 'commercial' }),
      User.countDocuments({ userType: 'industrial' })
    ]);

    // Calculate total consumption and average usage
    const users = await User.find();
    const totalConsumption = users.reduce((sum, user) => sum + (user.totalConsumption || 0), 0);
    const averageUsage = totalUsers > 0 ? totalConsumption / totalUsers : 0;

    res.json({
      totalUsers,
      activeUsers,
      userDistribution,
      totalConsumption,
      averageUsage
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 
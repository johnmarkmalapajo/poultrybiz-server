const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password, role, farm } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please fill in all fields' });
    }

    if (!role || !['Admin', 'Farmer'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Please select a valid role (Admin or Farmer)' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, role, farm });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token: generateToken(user._id),
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        farm:  user.farm,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: generateToken(user._id),
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        farm:  user.farm,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ME
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signup, login, getMe };
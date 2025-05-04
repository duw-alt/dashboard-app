const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Resident = require('../models/Resident');
const { getTranslations } = require('../utils/language');

const authController = {
  getLogin: (req, res) => {
    const translations = getTranslations(req);
    res.render('login', translations);
  },

  getRegister: (req, res) => {
    const translations = getTranslations(req);
    res.render('register', translations);
  },

  login: async (req, res) => {
    try {
      const { citizenId, password } = req.body;
      const user = await User.findOne({ citizenId });
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ errorKey: 'error_invalid_credentials' });
      }

      const token = jwt.sign({ citizenId }, process.env.JWT_SECRET);
      res.cookie('token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).json({ errorKey: 'error_login' });
    }
  },

  register: async (req, res) => {
    try {
      const { citizenId, password } = req.body;
      
      // Check if resident exists
      const resident = await Resident.findOne({ citizenId });
      if (!resident) {
        return res.status(400).json({ errorKey: 'error_citizen_not_found' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ citizenId });
      if (existingUser) {
        return res.status(400).json({ errorKey: 'error_account_exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ citizenId, password: hashedPassword });
      await user.save();
      
      res.status(201).json({ message: 'Registration successful! Please login.' });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ errorKey: 'error_account_exists' });
      } else {
        res.status(500).json({ errorKey: 'error_registration' });
      }
    }
  },

  logout: (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
  },

  checkResident: async (req, res) => {
    const { citizenId } = req.body;
    try {
      const resident = await Resident.findOne({ citizenId });
      if (!resident) {
        return res.status(404).json({ errorKey: 'error_citizen_not_found' });
      }
      const existingUser = await User.findOne({ citizenId });
      if (existingUser) {
        return res.status(400).json({ errorKey: 'error_account_exists' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ errorKey: 'error_resident_check' });
    }
  }
};

module.exports = authController; 
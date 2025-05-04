const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

router.get('/', (req, res) => res.redirect('/login'));
router.get('/login', authController.getLogin);
router.get('/register', authController.getRegister);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.post('/api/check-resident', authController.checkResident);

module.exports = router; 
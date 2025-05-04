const Resident = require('../models/Resident');
const { getTranslations } = require('../utils/language');

const dashboardController = {
  getDashboard: async (req, res) => {
    try {
      const translations = getTranslations(req);
      const resident = await Resident.findOne({ citizenId: req.user.citizenId });
      
      if (!resident) {
        return res.redirect('/login');
      }
      
      res.render('dashboard', { user: resident, ...translations });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = dashboardController; 
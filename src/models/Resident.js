const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  citizenId: { type: String, required: true, unique: true },
  name: { type: String },
  surname: { type: String },
  apartmentNumber: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  balance: { type: Number, default: 0 }
}, { collection: 'residents' });

module.exports = mongoose.model('Resident', residentSchema); 
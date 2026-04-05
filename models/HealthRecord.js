const mongoose = require('mongoose');

// Matches HealthRecord.jsx columns exactly
const healthRecordSchema = new mongoose.Schema({
  user:                   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:                   { type: Date, default: Date.now },
  noOfBirds:              { type: Number, default: 0 },       // Number of Birds
  nameOfVaccine:          { type: String, trim: true, default: '' }, // Vaccine/Drug
  targetAge:              { type: String, trim: true, default: '' },
  routeOfAdministration:  { type: String, trim: true, default: '' }, // Route of Admin
  dosageFrequency:        { type: String, trim: true, default: '' }, // Dosage
  administeredBy:         { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
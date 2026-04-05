const mongoose = require('mongoose');

// Matches MortalityRecord.jsx columns exactly
const mortalityRecordSchema = new mongoose.Schema({
  user:              { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:              { type: Date, default: Date.now },
  numberOfDeadHens:  { type: Number, default: 0 },            // Number of Dead Hens
  reasonCause:       { type: String, trim: true, default: '' }, // Reason/Cause
  notes:             { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('MortalityRecord', mortalityRecordSchema);
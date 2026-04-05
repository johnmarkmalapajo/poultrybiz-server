const mongoose = require('mongoose');

// Matches EquipmentRecord.jsx columns exactly
const equipmentSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemNumber:  { type: Number, default: 0 },                   // Item No.
  date:        { type: Date, default: Date.now },
  toolName:    { type: String, trim: true, default: '' },       // Tool Name
  description: { type: String, trim: true, default: '' },
  idNo:        { type: Number, default: 0 },                   // Id No.
  quantity:    { type: Number, default: 1 },
  unit:        { type: String, trim: true, default: '' },
  condition:   {
    type: String,
    enum: ['Good', 'Fair', 'Poor', 'For Repair', 'Condemned', ''],
    default: '',
  },
  location:    { type: String, trim: true, default: '' },
  custodian:   { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Equipment', equipmentSchema);
const mongoose = require('mongoose');

const flockSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  breed:          { type: String, trim: true, default: '' },
  source:         { type: String, trim: true, default: '' },
  dateAcquired:   { type: Date, default: Date.now },
  qtyPurchase:    { type: Number, default: 0 },  // Quantity at Purchase
  currentQty:     { type: Number, default: 0 },  // Current Quantity
  productiveRate: { type: Number, default: 0 },  // percentage
  mortalityRate:  { type: Number, default: 0 },  // percentage
  isActive:       { type: Boolean, default: true },
  notes:          { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.models.Flock || mongoose.model('Flock', flockSchema);
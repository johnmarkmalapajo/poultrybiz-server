const mongoose = require('mongoose');

// Matches SalesRecord.jsx columns exactly
const salesRecordSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:          { type: Date, default: Date.now },
  buyer:         { type: String, trim: true, default: '' },
  quantitySold:  { type: Number, default: 0 },                 // Quantity Sold
  eggSize:       { type: String, trim: true, default: '' },    // Egg Size
  unitSize:      { type: Number, default: 0 },                 // Unit Size (price per unit)
  totalAmount:   { type: Number, default: 0 },                 // Total Amount ₱
}, { timestamps: true });

// Auto-calculate totalAmount before save
salesRecordSchema.pre('save', function (next) {
  this.totalAmount = this.quantitySold * this.unitSize;
  next();
});

module.exports = mongoose.model('SalesRecord', salesRecordSchema);
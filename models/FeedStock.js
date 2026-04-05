const mongoose = require('mongoose');

const feedStockSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  feedType: { type: String, required: true, trim: true },
  quantityKg: { type: Number, required: true, default: 0 },
  lowStockThreshold: { type: Number, default: 50 }, // Alert when below this (kg)
  lastRestocked: { type: Date, default: Date.now },
  notes: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.models.FeedStock || mongoose.model('FeedStock', feedStockSchema);
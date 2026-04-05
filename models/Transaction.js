const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['sales', 'expense'],
    required: true,
  },
  category: {
    type: String,
    enum: ['egg_sales', 'bird_sales', 'feed', 'medicine', 'labor', 'utilities', 'other'],
    required: true,
  },
  amount: { type: Number, required: true },
  description: { type: String, trim: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
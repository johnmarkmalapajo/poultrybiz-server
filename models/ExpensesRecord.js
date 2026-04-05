const mongoose = require('mongoose');

// Matches ExpensesRecord.jsx columns exactly
const expensesRecordSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expenseDate: { type: Date, default: Date.now },              // Expense Date
  category:    {
    type: String,
    enum: ['Feed', 'Medicine', 'Labor', 'Utilities', 'Equipment', 'Other'],
    required: true,
  },
  amount:      { type: Number, required: true, default: 0 },  // Amount ₱
  receipt:     { type: String, trim: true, default: '' },     // Receipt
  remarks:     { type: String, trim: true, default: '' },     // Remarks
}, { timestamps: true });

module.exports = mongoose.model('ExpensesRecord', expensesRecordSchema);
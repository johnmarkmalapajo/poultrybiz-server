const express        = require('express');
const router         = express.Router();
const crudController = require('../controllers/crudController');
const ExpensesRecord = require('../models/ExpensesRecord');
const { protect, adminOnly } = require('../middleware/auth');

const ctrl = crudController(ExpensesRecord);

// Admin only — Farmers cannot access Expenses
router.route('/')
  .get(protect, adminOnly, ctrl.getAll)
  .post(protect, adminOnly, ctrl.create);

router.route('/:id')
  .get(protect, adminOnly, ctrl.getOne)
  .put(protect, adminOnly, ctrl.update)
  .delete(protect, adminOnly, ctrl.remove);

module.exports = router;

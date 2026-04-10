const express        = require('express');
const router         = express.Router();
const crudController = require('../controllers/crudController');
const SalesRecord    = require('../models/SalesRecord');
const { protect, adminOnly } = require('../middleware/auth');

const ctrl = crudController(SalesRecord);

// Admin only — Farmers cannot access Sales
router.route('/')
  .get(protect, adminOnly, ctrl.getAll)
  .post(protect, adminOnly, ctrl.create);

router.route('/:id')
  .get(protect, adminOnly, ctrl.getOne)
  .put(protect, adminOnly, ctrl.update)
  .delete(protect, adminOnly, ctrl.remove);

module.exports = router;

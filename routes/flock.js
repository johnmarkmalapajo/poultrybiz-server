const express = require('express');
const router = express.Router();
const { getFlocks, addFlock, updateFlock, deleteFlock } = require('../controllers/flockController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getFlocks).post(protect, addFlock);
router.route('/:id').put(protect, updateFlock).delete(protect, deleteFlock);

module.exports = router;
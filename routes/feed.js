const express = require('express');
const router = express.Router();
const { getFeedStocks, addFeedStock, updateFeedStock, deleteFeedStock } = require('../controllers/feedController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getFeedStocks).post(protect, addFeedStock);
router.route('/:id').put(protect, updateFeedStock).delete(protect, deleteFeedStock);

module.exports = router;
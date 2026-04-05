const express = require('express');
const router = express.Router();
const { getEggHarvests, addEggHarvest, updateEggHarvest, deleteEggHarvest } = require('../controllers/eggController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getEggHarvests).post(protect, addEggHarvest);
router.route('/:id').put(protect, updateEggHarvest).delete(protect, deleteEggHarvest);

module.exports = router;
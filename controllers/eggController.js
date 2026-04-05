const EggHarvest = require('../Models/EggHarvest');

// @desc    Get all egg harvests
// @route   GET /api/eggs
// @access  Private
const getEggHarvests = async (req, res) => {
  try {
    const harvests = await EggHarvest.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, count: harvests.length, data: harvests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add egg harvest
// @route   POST /api/eggs
// @access  Private
const addEggHarvest = async (req, res) => {
  try {
    const { date, totalEggs, eggSizes, notes } = req.body;
    const harvest = await EggHarvest.create({
      user: req.user.id,
      date,
      totalEggs,
      eggSizes,
      notes,
    });
    res.status(201).json({ success: true, data: harvest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update egg harvest
// @route   PUT /api/eggs/:id
// @access  Private
const updateEggHarvest = async (req, res) => {
  try {
    const harvest = await EggHarvest.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!harvest) return res.status(404).json({ success: false, message: 'Record not found' });
    res.status(200).json({ success: true, data: harvest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete egg harvest
// @route   DELETE /api/eggs/:id
// @access  Private
const deleteEggHarvest = async (req, res) => {
  try {
    const harvest = await EggHarvest.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!harvest) return res.status(404).json({ success: false, message: 'Record not found' });
    res.status(200).json({ success: true, message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getEggHarvests, addEggHarvest, updateEggHarvest, deleteEggHarvest };
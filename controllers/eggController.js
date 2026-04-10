const EggHarvest = require('../models/EggHarvest');

// ── GET ALL (CENTRALIZED) ──
const getEggHarvests = async (req, res) => {
  try {
    const harvests = await EggHarvest.find({})
      .sort({ date: -1 })
      .populate('user', 'name email'); // optional (para makita owner)

    res.status(200).json({
      success: true,
      count: harvests.length,
      data: harvests
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── CREATE ──
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

    res.status(201).json({
      success: true,
      data: harvest
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── UPDATE ──
const updateEggHarvest = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'Admin';

    const query = isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

    const harvest = await EggHarvest.findOneAndUpdate(
      query,
      req.body,
      { new: true, runValidators: true }
    );

    if (!harvest) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed or record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: harvest
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE ──
const deleteEggHarvest = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'Admin';

    const query = isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

    const harvest = await EggHarvest.findOneAndDelete(query);

    if (!harvest) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed or record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Record deleted'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getEggHarvests,
  addEggHarvest,
  updateEggHarvest,
  deleteEggHarvest
};
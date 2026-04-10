const Flock = require('../models/Flock');

// ── GET ALL (CENTRALIZED) ──
const getFlocks = async (req, res) => {
  try {
    const flocks = await Flock.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name email'); // optional (para makita kung sino gumawa)

    res.status(200).json({
      success: true,
      count: flocks.length,
      data: flocks
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── CREATE ──
const addFlock = async (req, res) => {
  try {
    const flock = await Flock.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: flock
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── UPDATE ──
const updateFlock = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'Admin';

    const query = isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

    const flock = await Flock.findOneAndUpdate(
      query,
      req.body,
      { new: true, runValidators: true }
    );

    if (!flock) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed or flock not found'
      });
    }

    res.status(200).json({
      success: true,
      data: flock
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE ──
const deleteFlock = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'Admin';

    const query = isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

    const flock = await Flock.findOneAndDelete(query);

    if (!flock) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed or flock not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Flock deleted'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getFlocks,
  addFlock,
  updateFlock,
  deleteFlock
};
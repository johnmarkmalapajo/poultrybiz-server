const Flock = require('../models/Flock');

const getFlocks = async (req, res) => {
  try {
    const flocks = await Flock.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: flocks.length, data: flocks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addFlock = async (req, res) => {
  try {
    const flock = await Flock.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, data: flock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateFlock = async (req, res) => {
  try {
    const flock = await Flock.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!flock) return res.status(404).json({ success: false, message: 'Flock not found' });
    res.status(200).json({ success: true, data: flock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFlock = async (req, res) => {
  try {
    const flock = await Flock.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!flock) return res.status(404).json({ success: false, message: 'Flock not found' });
    res.status(200).json({ success: true, message: 'Flock deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getFlocks, addFlock, updateFlock, deleteFlock };
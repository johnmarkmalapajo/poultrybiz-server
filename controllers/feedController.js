const FeedStock = require('../models/FeedStock');

const getFeedStocks = async (req, res) => {
  try {
    const stocks = await FeedStock.find({ user: req.user.id });
    res.status(200).json({ success: true, data: stocks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addFeedStock = async (req, res) => {
  try {
    const stock = await FeedStock.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, data: stock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateFeedStock = async (req, res) => {
  try {
    const stock = await FeedStock.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!stock) return res.status(404).json({ success: false, message: 'Feed stock not found' });
    res.status(200).json({ success: true, data: stock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFeedStock = async (req, res) => {
  try {
    const stock = await FeedStock.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!stock) return res.status(404).json({ success: false, message: 'Feed stock not found' });
    res.status(200).json({ success: true, message: 'Feed stock deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getFeedStocks, addFeedStock, updateFeedStock, deleteFeedStock };
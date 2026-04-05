// crudController.js — generates standard CRUD handlers for any Mongoose model

const crudController = (Model) => ({

  // GET all (user-scoped)
  getAll: async (req, res) => {
    try {
      const records = await Model.find({ user: req.user.id }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, count: records.length, data: records });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET one
  getOne: async (req, res) => {
    try {
      const record = await Model.findOne({ _id: req.params.id, user: req.user.id });
      if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
      res.status(200).json({ success: true, data: record });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST create
  create: async (req, res) => {
    try {
      const record = await Model.create({ ...req.body, user: req.user.id });
      res.status(201).json({ success: true, data: record });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // PUT update
  update: async (req, res) => {
    try {
      const record = await Model.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
      res.status(200).json({ success: true, data: record });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // DELETE
  remove: async (req, res) => {
    try {
      const record = await Model.findOneAndDelete({ _id: req.params.id, user: req.user.id });
      if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
      res.status(200).json({ success: true, message: 'Record deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
});

module.exports = crudController;
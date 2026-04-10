// crudController.js
// GET all    — Admin & Farmer see ALL records (centralized)
// GET one    — Admin & Farmer can view any record
// POST       — saves with the creator's user ID
// PUT/DELETE — only the creator OR admin can modify

const crudController = (Model) => ({

  // GET all — everyone sees all records
  getAll: async (req, res) => {
    try {
      const records = await Model.find({}).sort({ createdAt: -1 });
      res.status(200).json({ success: true, count: records.length, data: records });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET one — anyone can view
  getOne: async (req, res) => {
    try {
      const record = await Model.findById(req.params.id);
      if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
      res.status(200).json({ success: true, data: record });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST create — save with creator's user ID
  create: async (req, res) => {
    try {
      const record = await Model.create({ ...req.body, user: req.user.id });
      res.status(201).json({ success: true, data: record });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // PUT update — creator or Admin can update
  update: async (req, res) => {
    try {
      const isAdmin = req.user.role === 'Admin';
      const query   = isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, user: req.user.id };

      const record = await Model.findOneAndUpdate(query, req.body, {
        new: true, runValidators: true,
      });
      if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
      res.status(200).json({ success: true, data: record });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // DELETE — creator or Admin can delete
  remove: async (req, res) => {
    try {
      const isAdmin = req.user.role === 'Admin';
      const query   = isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, user: req.user.id };

      const record = await Model.findOneAndDelete(query);
      if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
      res.status(200).json({ success: true, message: 'Record deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
});

module.exports = crudController;
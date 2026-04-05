// crudRouter.js — builds a standard CRUD router for any controller

const express = require('express');
const { protect } = require('../middleware/auth');

const crudRouter = (controller) => {
  const router = express.Router();
  router.route('/')
    .get(protect, controller.getAll)
    .post(protect, controller.create);
  router.route('/:id')
    .get(protect, controller.getOne)
    .put(protect, controller.update)
    .delete(protect, controller.remove);
  return router;
};

module.exports = crudRouter;
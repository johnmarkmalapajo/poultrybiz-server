const crudRouter     = require('./crudRouter');
const crudController = require('../controllers/crudController');
const SalesRecord    = require('../models/SalesRecord');

module.exports = crudRouter(crudController(SalesRecord));
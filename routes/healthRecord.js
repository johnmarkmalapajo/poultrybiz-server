const crudRouter     = require('./crudRouter');
const crudController = require('../controllers/crudController');
const HealthRecord   = require('../models/HealthRecord');

module.exports = crudRouter(crudController(HealthRecord));
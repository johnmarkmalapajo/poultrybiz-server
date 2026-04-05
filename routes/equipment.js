const crudRouter     = require('./crudRouter');
const crudController = require('../controllers/crudController');
const Equipment      = require('../models/Equipment');

module.exports = crudRouter(crudController(Equipment));
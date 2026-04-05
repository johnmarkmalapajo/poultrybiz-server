const crudRouter       = require('./crudRouter');
const crudController   = require('../controllers/crudController');
const FeedConsumption  = require('../models/FeedConsumption');

module.exports = crudRouter(crudController(FeedConsumption));
const crudRouter       = require('./crudRouter');
const crudController   = require('../controllers/crudController');
const MortalityRecord  = require('../models/MortalityRecord');

module.exports = crudRouter(crudController(MortalityRecord));
const crudRouter       = require('./crudRouter');
const crudController   = require('../controllers/crudController');
const ExpensesRecord   = require('../models/ExpensesRecord');

module.exports = crudRouter(crudController(ExpensesRecord));
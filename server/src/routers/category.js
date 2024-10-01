const router = require('express-promise-router')();
import * as categoryController from '../controllers/category'
router.route('/all').get(categoryController.getCategoryController)
module.exports =  router
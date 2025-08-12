const router = require('express-promise-router')();
const insertController = require('../controllers/insert');
router.route('/').post(insertController.insertData)
module.exports = router;
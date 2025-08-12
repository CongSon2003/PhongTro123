const router = require('express-promise-router')();
import {getAcreageController} from '../controllers/acreage';
router.route('/all').get(getAcreageController);
module.exports = router;
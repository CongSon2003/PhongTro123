const router = require('express-promise-router')();
import {getProvincesController} from '../controllers/province';
router.route('/all').get(getProvincesController);
module.exports = router;
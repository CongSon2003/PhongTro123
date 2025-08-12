const router = require('express-promise-router')();
import {getPriceController} from '../controllers/price';
router.route('/all').get(getPriceController);
module.exports = router;
const router = require('express-promise-router')();
import {getOneUserController} from '../controllers/user';
import verify_Token from '../middlewares/verify_token'
router.route('/').get(verify_Token,getOneUserController);
module.exports = router;
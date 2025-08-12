const router = require('express-promise-router')();
import {getOneUserController,UpdateUserController} from '../controllers/user';
import verify_Token from '../middlewares/verify_token'
router.route('/').get(verify_Token,getOneUserController);
router.route('/update-user').put(verify_Token,UpdateUserController);
module.exports = router;
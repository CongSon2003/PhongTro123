const router = require('express-promise-router')();
import * as authController from '../controllers/auth';
const {validateAuth,schemas} = require('../middlewares/validate_auth')
router.route('/login').post(validateAuth(schemas.authLoginShema),authController.Login);
router.route('/register').post(validateAuth(schemas.authRegisterShema),authController.Register);
module.exports = router;
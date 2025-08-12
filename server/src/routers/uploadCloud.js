const router = require('express-promise-router')();
const {uploadCloudController, DeleteCloudController} = require('../controllers/uploadCloud');
const uploadCloud = require('../config/cloudinary.config');
router.post('/uploadCloud',uploadCloud.array('uploadFile'),uploadCloudController);
router.post('/deleteCloud',uploadCloud.array('filename'),DeleteCloudController);
module.exports = router;
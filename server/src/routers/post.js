const router = require('express-promise-router')();
const {GetPostsController,GetPostsLimitController,GetNewPostsController,createNewPostController,GetPostsLimitAdminController, updatePostController, deletePostController} = require('../controllers/post');
const { default: verify_Token } = require('../middlewares/verify_token');
router.route('/all').get(GetPostsController)
router.route('/limit').get(GetPostsLimitController)
router.route('/NewPosts').get(GetNewPostsController)

router.route('/create-new').post(verify_Token,createNewPostController);
router.route('/update-post').put(verify_Token,updatePostController);
router.route('/limit-admin').get(verify_Token,GetPostsLimitAdminController);
router.route('/delete-post').delete(verify_Token,deletePostController);
module.exports = router;
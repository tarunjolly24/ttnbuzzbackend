const { verify } = require('../../auth/token');
const postController=require('./post.controller');
const router=require('express').Router();

router.get('/getallpost',verify,postController.getallpost);
router.post('/createpost',verify,postController.createpost);
router.post('/flagpost',verify,postController.flagpost);
router.post('/likepost',verify,postController.likepost);
router.post('/unlikepost',verify,postController.unlikepost);
router.post('/undislikepost',verify,postController.undislikepost);

router.post('/dislikepost',verify,postController.dislikepost);
router.post('/unflagpost',verify,postController.unflagpost);
router.post('/deletepost',verify,postController.deletepost);
router.get('/getflagpost',verify,postController.getflaggedpost);


module.exports=router
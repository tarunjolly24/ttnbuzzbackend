const { verify } = require('../../auth/token');
const commentController=require('./comment.controller');
const router=require('express').Router();

router.get('/getallcomment',verify,commentController.getallcomment);
router.post('/createcomment',verify,commentController.createcomment);
router.post('/getpostcomment',verify,commentController.getpostcomment);


module.exports=router
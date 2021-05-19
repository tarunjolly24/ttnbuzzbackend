const router=require('express').Router();
const {verify}=require('../../auth/token');
const profileController=require('./profile.controller');
router.get('/userprofile',verify,profileController.getprofile);
router.get('/anyuserprofile',verify,profileController.getAnyProfile);
router.post('/userprofileupdate',verify,profileController.updateUserProfile)




module.exports=router
const router=require('express').Router();
const {verify}=require('../../auth/token');
const profileController=require('./profile.controller');
router.get('/userprofile',verify,profileController.getprofile);
router.get('/anyuserprofile',verify,profileController.getAnyProfile);
router.post('/userprofileupdate',verify,profileController.updateUserProfile)
router.post('/profilecount',verify,profileController.profileCount);

router.post('/image-upload',verify,profileController.imageupload);
router.post('/image-upload-coverImage',verify,profileController.imageuploadCover);

module.exports=router
const {passport}=require('../../Passport/passport');
const router=require('express').Router();
const {generateUserToken,verify}=require('../../auth/token');

router.get('/auth/google',
  passport.authenticate('google', {session:false,scope: ['email','profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', {session:false, failureRedirect: '/login' }),generateUserToken);



module.exports=router
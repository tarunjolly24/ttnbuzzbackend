const router=require('express').Router();
const friendController=require('./friends.controller');
const {verify}=require('../../auth/token');
//to get to know all friends of a user
router.get('/getallfriends',verify,friendController.getallfriends);


//to send a request to one user
router.post('/sentrequest',verify,friendController.sentrequest);

//to show all suggestions
router.get('/suggestions',verify,friendController.showsuggestions);


//to show all friendrequest
router.get('/friendrequest',verify,friendController.allfriendrequest);

//to see whom i have set the request
router.get('/requestsent',verify,friendController.allrequestSent);


//to accept a friend request
router.post('/acceptrequest',verify,friendController.acceptRequest);


//to reject a friend request
router.post('/rejectrequest',verify,friendController.rejectrequest);


module.exports=router
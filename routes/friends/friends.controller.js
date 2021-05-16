const friendService = require('./friends.service');

exports.getallfriends = async function (req, res) {
    try {
        let userProfileId = req.user.user.profileId;
        console.log(userProfileId);
        const friendList = await friendService.getallfriends(userProfileId);
        res.send(friendList);
    }
    catch (e) {
        res.send(e);
    }
}


exports.sentrequest = async function (req, res) {
    console.log(req.body);
    try {
        let userProfileId = req.user.user.profileId;
        let receiverProfileId = req.body.receiverProfileId;
        const response = await friendService.sentrequest(userProfileId, receiverProfileId);
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }

}
exports.showsuggestions = async function (req, res) {
    try {
        let userProfileId = req.user.user.profileId;
        const response = await friendService.showsuggestions(userProfileId);
        res.send(response);
    } catch (e) {
        res.send(e);
    }

}
exports.allfriendrequest = async function (req, res) {
    try {
        let userProfileId = req.user.user.profileId;
        const response = await friendService.allfriendrequest(userProfileId);
        res.send(response);
    } catch (e) {
        res.send(e);
    }

}
exports.acceptRequest = async function (req, res) {
    try {
        let userProfileId = req.user.user.profileId;
        let receiverProfileId = req.body.receiverProfileId;
        const response = await friendService.acceptRequest(userProfileId, receiverProfileId);
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }
}

exports.allrequestSent=async function(req,res){
    try {
        let userProfileId = req.user.user.profileId;
        const response = await friendService.allrequestsent(userProfileId);
        res.send(response);
    } catch (e) {
        res.send(e);
    }
}
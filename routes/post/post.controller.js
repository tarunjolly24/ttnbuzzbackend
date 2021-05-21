const postService = require('./post.service');

//get all post
exports.getallpost = async function (req, res) {

    try {
        const userProfileId = req.user.user.profileId
        const response = await postService.getallpost(userProfileId);
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }
}

//create a post 
exports.createpost = async function (req, res) {
    try {
        const userProfileId = req.user.user.profileId
        const data = req.body.data;
        const response = await postService.createpost(userProfileId, data);
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }

}

// flag  a post 
exports.flagpost = async function (req, res) {
    try {
        const userProfileId = req.user.user.profileId
        const postId = req.body.postId
        const response = await postService.flagpost(userProfileId, postId);
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }
}


//like a post
exports.likepost = async function (req, res) {
    try {
        const userProfileId = req.user.user.profileId
        const postId = req.body.postId
        const response = await postService.likepost(userProfileId, postId);
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }

}


//dislike a post
exports.dislikepost = async function (req, res) {
    try {
        const userProfileId = req.user.user.profileId
        const postId = req.body.postId
        const response = await postService.dislikepost(userProfileId, postId);
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }
}


//make a post unflagged only by moderator
exports.unflagpost = async function (req, res) {
    try {
        const userProfileId = req.user.user.profileId
        const postId = req.body.postId
        const response = await postService.unflagpost(userProfileId, postId);
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }
}


// delete a post only by moderator

exports.deletepost = async function (req, res) {
    try {
        const userProfileId = req.user.user.profileId
        const postId = req.body.postId
        const response = await postService.deletepost(userProfileId, postId);
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }
}








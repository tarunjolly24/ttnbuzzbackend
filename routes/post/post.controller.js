const postService = require('./post.service');
var cloudinary = require('cloudinary');

//get all post
//todo send only those post which are not flagged
exports.getflaggedpost=async function(req,res){
    try{
        const userProfileId=req.user.user.profileId;
        const response = await postService.getflaggedpost();
        // console.log('getallpost',response);
        res.send(response);


    }catch(e){
        res.send(e);
    }
}

exports.getallpost = async function (req, res) {

    try {
        const userProfileId = req.user.user.profileId
        const page=req.query.page;
        const response = await postService.getallpost(userProfileId,page);
        // console.log('getallpost',response);
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
        const data = req.body.description;
        // const image = Object.values(req.files);
        console.log('data 22', data);
        // console.log('imagee 23 ', image);
        const values = Object.values(req.files)
        console.log(values);
        console.log(values.length);

        let imageurl='';
        if(values.length===0){
            const response = await postService.createpost(userProfileId, data,imageurl);
            res.send(response);
        }else{
        const promises = values.map(image => cloudinary.uploader.upload(image.path))

        Promise.all(promises)
            .then(async (results) => {
                imageurl = results[0].url;
                console.log(results);
                console.log(imageurl);
                const ress = await postService.createpost(userProfileId,data,imageurl);

                res.json(ress)

            })
            .catch((err) => {
                console.log('err line 44',err)
                res.status(400).json(err)
            })
        }
    }
    catch (e) {
        console.log(e);
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
exports.unlikepost=async function(req,res){
    try{
        const userProfileId=req.user.user.profileId;
        const postId=req.body.postId
        const response=await postService.unlikepost(userProfileId,postId);
    }catch(e){
        res.send(e);
    }

}

exports.undislikepost=async function(req,res){
    try{
        const userProfileId=req.user.user.profileId;
        const postId=req.body.postId
        const response=await postService.undislikepost(userProfileId,postId);
    }catch(e){
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








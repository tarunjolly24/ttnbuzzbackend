const { postModel } = require('./../../Database/postModel');
const { profileModel } = require('../../Database/profileModel');
const { commentModel } = require('../../Database/commentModel');
exports.getflaggedpost = async function () {
    try {
        let allpost = await postModel.find({ flagged: 1 }).populate('createdBy').lean().exec();
        let arrOfpostId = allpost.map((eachpost) => {
            return eachpost._id;
        })
        console.log(arrOfpostId);
        const comments = await commentModel.find({ postId: { $in: arrOfpostId } }).populate('profileId').lean().exec();
        console.log(comments);
        for (let i = 0; i < allpost.length; i++) {
            allpost[i].comment = [];
            let count = 0;
            for (let j = 0; j < comments.length; j++) {
                // console.log(String(allpost[i]._id),String(comments[j].postId));
                // console.log(String(allpost[i]._id) === String(comments[j].postId));

                if (String(allpost[i]._id) === String(comments[j].postId)) {

                    allpost[i].comment.push(comments[j]);
                    count++;
                }
                if (count === 2) break;

            }
        }
        console.log('print all post',allpost);
        return allpost;
        
        // return posts;

    } catch (e) {
        return new Error(e);
    }
}

//get all post
exports.getallpost = async function (userProfileId, page) {
    try {
        const user = await profileModel.findOne({ _id: userProfileId });
        let arrayOfUser = user.friendsList;
        arrayOfUser.push(userProfileId);
        // console.log('arrayofuser',arrayOfUser);
        const allpost = await postModel.find({ createdBy: { $in: arrayOfUser } }).populate('createdBy').sort({createdOn:-1}).skip(page * 5).limit(5).lean().exec();
        let arrOfpostId = allpost.map((eachpost) => {
            return eachpost._id;
        })
        console.log(arrOfpostId);
        const comments = await commentModel.find({ postId: { $in: arrOfpostId } }).populate('profileId').lean().exec();
        console.log(comments);
        for (let i = 0; i < allpost.length; i++) {
            allpost[i].comment = [];
            let count = 0;
            for (let j = 0; j < comments.length; j++) {
                // console.log(String(allpost[i]._id),String(comments[j].postId));
                // console.log(String(allpost[i]._id) === String(comments[j].postId));

                if (String(allpost[i]._id) === String(comments[j].postId)) {

                    allpost[i].comment.push(comments[j]);
                    count++;
                }
                if (count === 2) break;

            }
        }
        console.log('print all post',allpost);
        return allpost;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}

//create a post 
exports.createpost = async function (userProfileId, data, imageurl) {
    let post = {
        description: data,
        image: imageurl,
        createdBy: userProfileId,
        createdOn: new Date(),
    }
    const profile=await profileModel.findOne({_id:userProfileId});

    let newPost = new postModel(post);
    const savePost = await newPost.save();
    // const newsavepost=await savepost.populate('createdBy').exec();
    savePost.createdBy=profile;
    console.log(savePost);
    return savePost;

}

// flag  a post 
exports.flagpost = async function (userProfileId, postId) {
    const post = await postModel.findOne({ _id: postId });
    post.flagged = 1
    const updatedPost = await post.save();
    return updatedPost;
}


//like a post
exports.likepost = async function (userProfileId, postId) {

    const post = await postModel.findOne({ _id: postId });
    post.likes.push(userProfileId);
    let idx = post.dislikes.indexOf(userProfileId);
    if (idx > -1) {
        post.dislikes.splice(idx, 1);
    }



    const updatedPost = await post.save();
    return updatedPost;
}

exports.unlikepost = async function (userProfileId, postId) {
    try {
        const post = await postModel.findOne({ _id: postId });
        let idx = post.likes.indexOf(userProfileId);
        if (idx > -1)
            post.likes.splice(idx, 1);
        const updatedPost = await post.save();
        return updatedPost;

    } catch (e) {
        return new Error(e);
    }
}
exports.undislikepost = async function (userProfileId, postId) {
    try {
        const post = await postModel.findOne({ _id: postId });
        let idx = post.dislikes.indexOf(userProfileId);
        if (idx > -1)
            post.dislikes.splice(idx, 1);
        const updatedPost = await post.save();
        return updatedPost;

    } catch (e) {
        return new Error(e);
    }
}


//dislike a post
exports.dislikepost = async function (userProfileId, postId) {

    const post = await postModel.findOne({ _id: postId });
    post.dislikes.push(userProfileId);
    let idx = post.likes.indexOf(userProfileId);
    if (idx > -1) {
        post.likes.splice(idx, 1);
    }
    const updatedPost = await post.save();
    return updatedPost;
}


//make a post unflagged only by moderator
exports.unflagpost = async function (userProfileId, postId) {
    const post = await postModel.findOne({ _id: postId });
    post.flagged = 0;
    const updatedPost = await post.save();
    return updatePost;
}


// delete a post only by moderator

exports.deletepost = async function (userProfileId, postId) {
    const post = await postModel.remove({ _id: postId });
    return post;
}








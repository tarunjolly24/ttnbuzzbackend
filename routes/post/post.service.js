const {postModel}=require('./../../Database/postModel');
const {profileModel}=require('../../Database/profileModel');

exports.getflaggedpost=async function(){
    try{
        let posts=await postModel.find({flagged:1}).populate('createdBy').exec();
        return posts;

    }catch(e){
        return new Error(e);
    }
}

//get all post
exports.getallpost=async function(userProfileId){
    try{
    const user=await profileModel.findOne({_id:userProfileId});
    let arrayOfUser=user.friendsList;
    arrayOfUser.push(userProfileId);
    // console.log('arrayofuser',arrayOfUser);
    const allpost=await postModel.find({createdBy:{$in:arrayOfUser}}).populate('createdBy').exec();
    // console.log('print all post',allpost);
    return allpost;
    }
    catch(e){
        console.log(e);
        return e;
    }
}

//create a post 
exports.createpost=async function(userProfileId,data,imageurl){
    let post={
        description:data,
        image:imageurl,
        createdBy:userProfileId,
        createdOn:new Date(),
    }

    let newPost=new postModel(post);
    const savePost= await newPost.save();
    return savePost;
    
}

// flag  a post 
exports.flagpost=async function(userProfileId,postId){
    const post=await postModel.findOne({_id:postId});
    post.flagged=1
    const updatedPost= await post.save();
    return updatedPost;
}


//like a post
exports.likepost=async function(userProfileId,postId){

    const post=await postModel.findOne({_id:postId});
    post.likes.push(userProfileId);
    let idx=post.dislikes.indexOf(userProfileId);
    if(idx > -1){
        post.dislikes.splice(idx,1);
    }



    const updatedPost= await post.save();
    return updatedPost;
}

exports.unlikepost=async function(userProfileId,postId){
    try{
        const post=await postModel.findOne({_id:postId});
        let idx=post.likes.indexOf(userProfileId);
        if(idx>-1)
        post.likes.splice(idx,1);
        const updatedPost=await post.save();
        return updatedPost;

    }catch(e){
        return new Error(e);
    }
}
exports.undislikepost=async function(userProfileId,postId){
    try{
        const post=await postModel.findOne({_id:postId});
        let idx=post.dislikes.indexOf(userProfileId);
        if(idx>-1)
        post.dislikes.splice(idx,1);
        const updatedPost=await post.save();
        return updatedPost;

    }catch(e){
        return new Error(e);
    }
}


//dislike a post
exports.dislikepost=async function(userProfileId,postId){

    const post=await postModel.findOne({_id:postId});
    post.dislikes.push(userProfileId);
    let idx=post.likes.indexOf(userProfileId);
    if(idx > -1){
        post.likes.splice(idx,1);
    }
    const updatedPost= await post.save();
    return updatedPost;
}


//make a post unflagged only by moderator
exports.unflagpost=async function(userProfileId,postId){
    const post=await postModel.findOne({_id:postId});
    post.flagged=0;
    const updatedPost= await post.save();
    return updatePost;
}


// delete a post only by moderator

exports.deletepost=async function(userProfileId,postId){
    const post=await postModel.remove({_id:postId});
    return post;
}








const {postModel}=require('./../../Database/postModel');
const {profileModel}=require('../../Database/profileModel');


//get all post
exports.getallpost=async function(userProfileId){
    const user=await profileModel.findOne({_id:userProfileId});
    let arrayOfUser=user.friendsList;
    arrayOfUser.push(userProfileId);

    const allpost=await postModel.find({createdBy:{$in:arrayOfUser}}).populate('createdBy').exec().lean();
    console.log(allpost);
    return allpost;
}

//create a post 
exports.createpost=async function(userProfileId,data){
    let post={
        description:data.description,
        image:data.image,
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
    post.flagged.push(userProfileId);
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
    post.flagged.splice(0,post.flagged.length);
    const updatedPost= await post.save();
    return updatePost;
}


// delete a post only by moderator

exports.deletepost=async function(userProfileId,postId){
    const post=await postModel.remove({_id:postId});
    return post;
}








const {commentModel}=require('./../../Database/commentModel');


exports.getallcomment=async ()=>{
    const commentArray=await commentModel.find();
    return commentArray;
}

exports.createcomment=async (userProfileId,postId,description)=>{
    let comment={
        description:description,
        profileId:userProfileId,
        postId:postId,
        createdOn:new Date()
    }
    const newcomment=new commentModel(comment);
    const output=await newcomment.save();
    return output;
}
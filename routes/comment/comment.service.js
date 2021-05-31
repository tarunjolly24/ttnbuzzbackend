const {commentModel}=require('./../../Database/commentModel');


exports.getallcomment=async ()=>{
    const commentArray=await commentModel.find().populate('profileId').exec();
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

exports.getpostcomment=async (userProfileId,postId,page,offset,minustwo)=>{
       let skip=page*offset+2-minustwo;
        const postcomment=await commentModel.find({postId:postId}).populate('profileId').skip(skip).limit(offset).exec();
        return postcomment;

}
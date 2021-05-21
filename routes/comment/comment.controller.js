const commentServices=require('./comment.service');

exports.getallcomment=async (req,res)=>{
    try{
        const response=await commentServices.getallcomment();
        res.send(response);
    }catch(e){
        res.send(e)
    }
}


exports.createcomment=(req,res)=>{
    try{
        const userProfileId=req.user.user.profileId;
        const postId=req.body.postId;
        const description=req.body.description;
        const response=await commentServices.createcomment(userProfileId,postId,description);
        res.send(response);

    }catch(e){
        res.send(e);
    }
}

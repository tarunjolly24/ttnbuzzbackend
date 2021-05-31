const commentServices=require('./comment.service');

exports.getallcomment=async (req,res)=>{
    try{
        const response=await commentServices.getallcomment();
        res.send(response);
    }catch(e){
        res.send(e)
    }
}


exports.createcomment=async (req,res)=>{
    try{
        const userProfileId=req.user.user.profileId;
        const postId=req.body.data.postId;
        const description=req.body.data.description;
        const response=await commentServices.createcomment(userProfileId,postId,description);
        res.send(response);

    }catch(e){
        res.send(e);
    }
}


exports.getpostcomment=async (req,res)=>{
    try{
        const userProfileId=req.user.user.profileId;
        const postId=req.body.postId;
        const page=req.body.page;
        const offset=req.body.offset;
        const minustwo=req.body.minustwo;
        const response=await commentServices.getpostcomment(userProfileId,postId,page,offset,minustwo);
        res.send(response);
    }catch(e){
        res.send(e);
    }
}
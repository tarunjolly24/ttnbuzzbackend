const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema=new Schema({
    description:{
        type:String
    },
    profileId:{
        type:Schema.Types.ObjectId,
        ref:'profile',
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'post',
    },
    createdOn:{
        type:Date
    }
})

const commentModel=mongoose.model('comment',commentSchema);
module.exports={commentModel};
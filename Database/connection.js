const mongoose=require('mongoose');
const {userModel}=require('./UserModel');
const {profileModel}=require('./profileModel');
const {postModel}=require('./postModel');
const {commentModel}=require('./commentModel');
const dotenv = require('dotenv');
dotenv.config();
// mongodb://localhost:27017/testing
//mongodb+srv://root:<password>@cluster0.bm7sn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(`mongodb+srv://${process.env.dbuser}:${process.env.dbpassword}@cluster0.bm7sn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
});

mongoose.connection.on('error',(err)=>{
    console.log('error');
})

mongoose.connection.on('connected',async(err,res)=>{
    console.log('connected');
    // let user1=new userModel();
    // user1.email='tarunjolly8@gmail.com';
    
    // user1.save();
    // console.log(user1);
    
    // const user=await userModel.find();
    // console.log(user[0]);

    // let profile1=new profileModel();
    // profile1.email=user[0].email;
    // profile1.firstName='tarun';
    // profile1.lastName='jolly';
    // profile1.save( async (err,doc)=>{
    //     const user=await userModel.findOneAndUpdate({email:doc.email},{profileId:doc._id});
    //     console.log(user);
        

    // });
    // console.log("profile", profile);

    //create a user
    // let user2=new userModel();
    // user2.email='test2@test2.com';
    // user2.save((err,doc)=>{
    //     let profile2=new profileModel();
    //     profile2.firstName='test2';
    //     profile2.email=doc.email
    //     profile2.save(async (err,doc1)=>{
    //         console.log('doc1',doc1)
    //         await userModel.findOneAndUpdate({email:doc1.email},{profileId:doc1._id});
    //     })
    // });

    //friend part
    // const output=await userModel.findOne({"email" : "test2@test2.com"}).populate('profileId').exec();
    // // const output=await profileModel.find({email:'test@test.com'});
    // console.log(output);
    // let id=new mongoose.Schema.Types.ObjectId('60993a014da896378f194bd7');
    // const ab= await profileModel.findOne({email:'tarunjolly8@gmail.com'});
    // ab.friendsList.push("60994033e9debe4875289333");
    //  ab.save();
    // console.log(ab);
    // const ab= await profileModel.findOne({email:'tarunjolly8@gmail.com'}).populate('friendsList').exec();
    // console.log(ab);
    



    

    // console.log('profile1',profile1);

    //post and find all post
    // const post1=new postModel({
    //     description:'hey my first post',
    //     createdBy:'609937938dfcd82c21b66534',
    //     createdOn:new Date(),
    // })
    // post1.save();
    // const allfriends=await profileModel.find({_id:"609937938dfcd82c21b66534"});
    // const allmember=allfriends[0].friendsList;
    // allmember.push("609937938dfcd82c21b66534");
    // console.log(allmember);
    // const output=await postModel.find({createdBy:{$in:allmember}}).lean();
    // //all post of mine and my friends
    // console.log(output);
    // const allcomments=await commentModel.find().lean();

    // const makeData=output.map((eachpost)=>{
    //     // console.log(eachpost._id);
    //     let comments=allcomments.filter((comment)=>{
    //         console.log("comment id",comment.postId);
    //         console.log("eahpost id",eachpost._id);

    //         if(comment.postId==eachpost._id)return true;
    //     })
    //     let comments=[]
    //     for(let i=0;i<allcomments.length;i++){
    //         if(String(allcomments[i].postId)==String(eachpost._id)){
    //             comments.push(allcomments[i]);
    //         }
    //         console.log(allcomments[i].postId,eachpost._id);
          

    //         console.log(String(allcomments[i].postId)==String(eachpost._id))

    //     }
    //     console.log("comments",comments);
    //     if(comments.length>0){
    //         eachpost['comments']=comments;
    //     }
    //     return eachpost;
    // })
    // // makeData.lean().[0].comments=allcomments;
    // console.log(makeData[1])


    //adding comment
    // const comment=new commentModel({
    //     description:'good post',
    //     profileId:"60993a014da896378f194bd7",
    //     postId:"60994838334ee05bb560b34c",
    //     date:new Date()
    // })
    
    // comment.save();

    // const allpost=await postModel.find();
    // console.log(allpost);


})

module.exports={mongoose};
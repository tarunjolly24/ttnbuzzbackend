const { profileModel } = require('../../Database/profileModel');

exports.getallfriends = async function (userprofileId) {

    try {
        const allfriends = await profileModel.findOne({ _id: userprofileId }).populate('friendsList').exec();
        console.log(allfriends);
        return allfriends.friendsList;
    } catch (e) {
        throw new Error("something went wrong to get all friends");
    }
}

exports.sentrequest = async function (userProfileId, receiverProfileId) {
    try {
        const userA = await profileModel.findOne({ _id: userProfileId });
        userA.requestSent.push(receiverProfileId);
        const res = await userA.save();


        const userB = await profileModel.findOne({ _id: receiverProfileId });
        userB.requestList.push(userProfileId);
        const reso = await userB.save();
        return { res, reso };


    } catch (e) {
        throw new Error("error in sent request");
    }
}

exports.showsuggestions = async function (userProfileId) {
    try {
        const user = await profileModel.findOne({ _id: userProfileId }).lean();
        console.log('user',user);
        const friendlist = user.friendsList;
        const requestSent=user.requestSent;
        const requestList=user.requestList;
        // console.log(friendlist);
        const updateOne=friendlist.concat(requestSent);
        const updateTwo=updateOne.concat(requestList);

        // friendlist.push(userProfileId);
        updateTwo.push(userProfileId);
        const suggestions = await profileModel.find({ _id: { $nin: updateTwo } });
        return suggestions;

    } catch (e) {
        console.log('erorr line 43',e);
        throw new Error(e);
    }
}

exports.allfriendrequest =async function (userProfileId) {
    try {
        const user = await profileModel.findOne({ _id: userProfileId }).populate('requestList').exec();
        return user;
    } catch (e) {
        throw new Error("error in friend request");
    }
}
exports.allrequestsent =async function (userProfileId) {
    try {
        const user = await profileModel.findOne({ _id: userProfileId }).populate('requestSent').exec();
        return user;
    } catch (e) {
        throw new Error("error in friend request");
    }
}


exports.acceptRequest=async function(userProfileId,receiverProfileId){
    try{
        // console.log(userProfileId,receiverProfileId)
        const userA=await profileModel.findOne({_id:userProfileId});
        // console.log('userA',userA);
        userA.friendsList.push(receiverProfileId);
        let idx=userA.requestList.indexOf(receiverProfileId);
        userA.requestList.splice(idx,1);
        // console.log('userA see',userA);

        const userB=await profileModel.findOne({_id:receiverProfileId});
        // console.log('userB',userB);

        userB.friendsList.push(userProfileId);
        idx=userB.requestSent.indexOf(userProfileId);
        userB.requestSent.splice(idx,1);
       const updatedUserA= await userA.save();

       const updatedUserB= await userB.save();
        return {updatedUserA,updatedUserB};

        


    }catch(e){
        throw new Error('error in accept request');
    }
}


exports.rejectrequest=async (userProfileId,receiverProfileId)=>{
    try{
    const userA=await profileModel.findOne({_id:userProfileId});
    let idx=userA.requestList.indexOf(receiverProfileId);
    userA.requestList.splice(idx,1); 

    const userB=await profileModel.findOne({_id:receiverProfileId});
    idx=userB.requestSent.indexOf(userProfileId);
    userB.requestSent.splice(idx,1);
    const updatedUserA= await userA.save();

    const updatedUserB= await userB.save();

    return {updatedUserA,updatedUserB};
    }
    catch(e){
        throw new Error("error in rejecting the request");
    }



}
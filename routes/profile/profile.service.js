var mongoose = require('mongoose'); 
const { profileModel } = require('../../Database/profileModel');


exports.getProfile = async function (profileId) {
    // console.log(profileId);
    try {
        let data = await profileModel.findOne({ _id: profileId });
        // console.log('data', data);
        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (e) {
        console.log('line 14',e);
        throw new Error(e);
    }

}

exports.anyUserProfile = async function (profileId) {
    // console.log('anyUserProfileId',profileId);

    try {
        let data = await profileModel.findOne({ _id: profileId });
        // console.log('data 24', data);
        if (data) {
            return data;
        } else {
            return null;
        }
    }
    catch (e) {
        throw new Error(e);
    }

}


exports.updateUserProfile=async function(userDetailsToUpdate){
    
    try{
    const userProfileId=userDetailsToUpdate._id;
    const getUser=await profileModel.findOne({_id:userProfileId});
    // console.log(getUser);
    getUser.firstName=userDetailsToUpdate.firstName;
    getUser.lastName=userDetailsToUpdate.lastName;
    getUser.dob=userDetailsToUpdate.dob;
    getUser.gender=userDetailsToUpdate.gender;
    getUser.city=userDetailsToUpdate.city;
    getUser.state=userDetailsToUpdate.state;
    getUser.profileImage=userDetailsToUpdate.profileImage;
    getUser.coverImage=userDetailsToUpdate.coverImage;
    getUser.designation=userDetailsToUpdate.designation;
    getUser.website=userDetailsToUpdate.website;
    getUser.about=userDetailsToUpdate.about;
    return await getUser.save();
    }
    catch(e){
        return new Error("updation failed");
    }
    
}


exports.imageupload=async (userProfileId,imageurl)=>{
    try{
        const user=await profileModel.findOne({_id:userProfileId});
        user.profileImage=imageurl;
        const updateduser= await user.save();
        return updateduser;
    }catch(e){
        return new Error(e);
    }
}

exports.profileCount=async (userprofileId,receiverProfileId)=>{
    try{
        // console.log(typeof receiverProfileId);
        // console.log(receiverProfileId);

        var id = mongoose.Types.ObjectId(receiverProfileId);
        // console.log(id);

        const user=await profileModel.findOne({_id:id});
        // console.log(user);
        user.profileCount=user.profileCount+1;
        const updatedUser=await user.save();
        // console.log(updatedUser);
        return updatedUser;
    }catch(e){
        // console.log('line 84 aaa',e);
        return e;
    }
}


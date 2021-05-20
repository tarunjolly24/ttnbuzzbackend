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
        throw new Error("not found");
    }

}

exports.anyUserProfile = async function (profileId) {
    console.log('anyUserProfileId',profileId);

    try {
        let data = await profileModel.findOne({ _id: profileId });
        console.log('data 24', data);
        if (data) {
            return data;
        } else {
            return null;
        }
    }
    catch (e) {
        throw new Error("not found");
    }

}


exports.updateUserProfile=async function(userDetailsToUpdate){
    
    try{
    const userProfileId=userDetailsToUpdate._id;
    const getUser=await profileModel.findOne({_id:userProfileId});
    console.log(getUser);
    getUser.firstName=userDetailsToUpdate.firstName;
    getUser.lastName=userDetailsToUpdate.lastName;
    getUser.dob=userDetailsToUpdate.dob;
    getUser.gender=userDetailsToUpdate.gender;
    getUser.city=userDetailsToUpdate.city;
    getUser.state=userDetailsToUpdate.state;
    getUser.profileImage=userDetailsToUpdate.profileImage;
    getUser.coverImage=userDetailsToUpdate.coverImage;
    return await getUser.save();
    }
    catch(e){
        return new Error("updation failed");
    }
    
}

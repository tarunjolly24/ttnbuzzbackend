const { profileModel } = require('../../Database/profileModel');

exports.getProfile = async function (profileId) {
    // console.log(profileId);
    try {
        let data = await profileModel.findOne({ _id: profileId });
        console.log('data', data);
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
    // console.log(profileId);
    try {
        let data = await profileModel.findOne({ _id: profileId });
        console.log('data', data);
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




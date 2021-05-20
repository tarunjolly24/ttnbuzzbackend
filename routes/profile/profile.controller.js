const profileService = require('./profile.service');
const profileModel = require('../../Database//profileModel');

exports.getprofile = async function (req, res) {
    // console.log("line 5",req.user.user.profileId)
    try {
        const profile = await profileService.getProfile(req.user.user.profileId);
        res.send(profile);
    } catch (e) {
        res.send("no profile found");
    }
}

exports.getAnyProfile = async function (req, res) {
    try {


        const profileId = req.query.profileId;
        // console.log('line 19 profileID',profileId);
        // console.log('line 12', req.query);
        const userProfile = await profileService.anyUserProfile(profileId);
        // console.log('userProfile',userProfile);
        res.send(userProfile);
    }
    catch (e) {
        res.send('no profile found');
    }
}

exports.updateUserProfile=async function(req,res){
    try{
        const userDetailsToUpdate=req.body.updatedDetails;
        const userUpdatedProfile=await profileService.updateUserProfile(userDetailsToUpdate);
        res.send('Successfully Updated');
    }catch(e){
        res.send('update failed');
    }
}
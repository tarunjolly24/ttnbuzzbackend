const profileService = require('./profile.service');
const profileModel = require('../../Database//profileModel');
var cloudinary = require('cloudinary');

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

exports.updateUserProfile = async function (req, res) {
    try {
        const userDetailsToUpdate = req.body.updatedDetails;
        const userUpdatedProfile = await profileService.updateUserProfile(userDetailsToUpdate);
        res.send('Successfully Updated');
    } catch (e) {
        res.send('update failed');
    }
}

exports.imageupload = async function (req, res) {

    // console.log(req.body);
    let userProfileId = req.user.user.profileId;
    const values = Object.values(req.files)
    // console.log(values);
    const promises = values.map(image => cloudinary.uploader.upload(image.path))

    Promise.all(promises)
        .then(async (results) => {
            let imageurl = results[0].url;
            // console.log(results);
            // console.log(imageurl);
            const ress = await profileService.imageupload(userProfileId, imageurl);

            res.json({ results, ress })

        })
        .catch((err) => {
            // console.log('err line 44',err)
            res.status(400).json(err)
        })

};
exports.imageuploadCover=async function(req,res){
    let userProfileId = req.user.user.profileId;
    const values = Object.values(req.files)
    // console.log(values);
    const promises = values.map(image => cloudinary.uploader.upload(image.path))

    Promise.all(promises)
        .then(async (results) => {
            let imageurl = results[0].url;
            // console.log(results);
            // console.log(imageurl);
            const ress = await profileService.imageuploadCover(userProfileId, imageurl);

            res.json({ results, ress })

        })
        .catch((err) => {
            // console.log('err line 44',err)
            res.status(400).json(err)
        })
   
}


exports.profileCount = async function (req, res) {
    try {
        const profileId = req.user.user.profileId;
        const receiverProfileId =req.body.receiverProfileId;
        // console.log(req.body);
        // console.log('line 71',receiverProfileId);
        // console.log(profileId);
        const response = await profileService.profileCount(profileId, receiverProfileId);
        return response;
    } catch (e) {
        // console.log(e);
        res.status(400).json(e);
    }
}








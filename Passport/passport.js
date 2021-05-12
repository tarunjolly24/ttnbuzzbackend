var passport = require('passport');
var { userModel } = require('../Database/UserModel');
var { profileModel } = require('../Database/profileModel');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GoogleStrategy=require('passport-google-oauth2').Strategy


passport.use(new GoogleStrategy({
    clientID: '499097539107-cfovn6r6v2or911udv8dd34563k6g54i.apps.googleusercontent.com',
    clientSecret: 'Rb4Ti3GFafdZvt4fI9KBRHj6',
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {

        console.log(profile._json)
        let user = await userModel.findOne({ email: profile._json.email });
        if (!user) {
            let obj = {
                email: profile._json.email,
                role: (profile._json.email === 'tarun.jolly@tothenew.com' ? 'admin' : 'user'),
                provider: 'google',
                google: profile._json,
            }
            user = new userModel(obj);
            user.save(function (err, doc) {
                let userProfile = {
                    firstName:profile._json.given_name,
                    lastName:profile._json.family_name,
                    email:profile._json.email,
                }
                const newUserProfile=new profileModel(userProfile);
                newUserProfile.save(async function(err,doc){
                    user.profileId=doc._id
                    await user.save();
                })
            })

        }
        cb(null, user);
    }
));








module.exports = { passport }

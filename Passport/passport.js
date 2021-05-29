var passport = require('passport');
var { userModel } = require('../Database/UserModel');
var { profileModel } = require('../Database/profileModel');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config();
// const GoogleStrategy=require('passport-google-oauth2').Strategy
// console.log(process.env.clientID);

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL
},
    async function (accessToken, refreshToken, profile, cb) {

        // console.log(profile._json)
        let user = await userModel.findOne({ email: profile._json.email });
        if(!user) {
            let obj = {
                email: profile._json.email,
                role: (profile._json.email === 'tarun.jolly@tothenew.com' ? 'admin' : 'user'),
                provider: 'google',
                google: profile._json,
            }
            user = new userModel(obj);
            //new code
            
            const updatedUser=await user.save();
                 let userProfile = {
                    firstName:profile._json.given_name,
                    lastName:profile._json.family_name,
                    email:profile._json.email,
                    profileImage:'https://res.cloudinary.com/ddcgdnhqp/image/upload/v1621531829/uxz2n8ntfpk2typowdig.jpg',
                    coverImage:'https://res.cloudinary.com/ddcgdnhqp/image/upload/v1621531988/nymoy1gqxspkji8x8ktn.png',
                    role:updatedUser.role,
                }
                const newUserProfile=new profileModel(userProfile);
                const profileOfUser= await newUserProfile.save();
                updatedUser.profileId=profileOfUser._id;
                const finalUser=await updatedUser.save();
                user=finalUser;
                // console.log('1');


            //old code
            // user.save(function (err, doc) {
            //     let userProfile = {
            //         firstName:profile._json.given_name,
            //         lastName:profile._json.family_name,
            //         email:profile._json.email,
            //         profileImage:'https://res.cloudinary.com/ddcgdnhqp/image/upload/v1621531829/uxz2n8ntfpk2typowdig.jpg',
            //         coverImage:'https://res.cloudinary.com/ddcgdnhqp/image/upload/v1621531988/nymoy1gqxspkji8x8ktn.png',
            //     }
            //     const newUserProfile=new profileModel(userProfile);
            //     newUserProfile.save(async function(err,doc){
            //         user.profileId=doc._id
            //        const ab= await user.save();
            //     //    console.log('1');
            //     })
            // })

        }
        // console.log('2');
        // console.log(user)
        cb(null, user);
    }
));








module.exports = { passport }

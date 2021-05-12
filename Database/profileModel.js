const mongoose = require('mongoose');
const Schema = mongoose.Schema

const profileSchema = new Schema({

    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    about: {
        type: String,
    },
    dob: {
        type: String,
    },
    gender: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    friendsList: {
        type: [
            { type: Schema.Types.ObjectId, ref: 'profile' }
        ]
    },
    requestList: {
        type: [{ type: Schema.Types.ObjectId, ref: 'profile' }]
    },
    requestSent: {
        type: [{ type: Schema.Types.ObjectId, ref: 'profile' }]

    }



})


const profileModel = mongoose.model('profile', profileSchema);

module.exports = {profileModel};
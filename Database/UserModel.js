const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user' //user or admin
    },
    provider: {
        type: String,
        default:"google"
    },
    google: {
        type: mongoose.Schema.Types.Mixed,
        
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    }
})

const userModel = mongoose.model('user', userSchema);


module.exports ={ userModel};
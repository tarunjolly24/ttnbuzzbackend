const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    description: {
        type: String,
    },
    image: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
    createdOn: {
        type: Date
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'profile' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'profile' }],
    flagged: {
        type: Number,
        default: 0
    }


})


const postModel = mongoose.model('post', postSchema);

module.exports = {postModel};
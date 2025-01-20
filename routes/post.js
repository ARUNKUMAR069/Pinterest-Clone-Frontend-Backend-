const mongoose = require('mongoose');
const { use } = require('.');


//  Schema for the post
const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Array,
        default: []
    },
});



module.exports = mongoose.model('Post', postSchema);
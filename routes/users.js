const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/PinterestClone');


// Schema for the user
const userSchema = new mongoose.Schema({
  // Full name of the user
  fullname: {
    type: String,
    required: true

  },
  // Username of the user
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Email of the user
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Password of the user
  password: {
    type: String,
    trim: true
  },
  // Posts of the User
  posts: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  // Profile Picture of the User
  dp: {
    type: String, //Assuming the profile picture is stored as a URL or a  file path
  }
})


userSchema.plugin(plm);







// MODELS

// Model for the user
module.exports = mongoose.model('User', userSchema);





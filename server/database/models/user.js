const { model, Schema } = require('mongoose');

// User Schema
// Defines how to store users info password isn't required if logged in with twitter

const UserSchema = new Schema({
  twitterId: {
    type: String,
    unique: true,
    default: Date.now(),
  },
  twitterImg: {
    type: String,
    default: 'https://www.shareicon.net/data/256x256/2015/09/18/103159_user_512x512.png',
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
});

const User = model('users', UserSchema);

module.exports = User;

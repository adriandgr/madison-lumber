const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a Schema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  uuid: {
    type: String,
    unique: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  accountType: {
    type: String,
    default: 'free'
  },
  admin: {
    type: Boolean,
    default: false
  }
});

// middleware - make sure a random uuid is created
userSchema.pre('save', function(next) {
  this.uuid = shortid.generate();
  next();
});

// create user model
const userModel = mongoose.model('User', userSchema);



// export Model
module.exports = userModel;
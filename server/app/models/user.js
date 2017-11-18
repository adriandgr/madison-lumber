const shortid = require('shortid');
const mongoose = require('mongoose');

// Initialize user schema
const userSchema = require('./schemas/user');

// middleware - make sure a random uuid is created
userSchema.pre('save', function(next) {
  this.uuid = shortid.generate();
  next();
});

////////////////////
// ~ User model ~ //
////////////////////
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
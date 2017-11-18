const { Schema } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  hash: String,
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

module.exports = userSchema;
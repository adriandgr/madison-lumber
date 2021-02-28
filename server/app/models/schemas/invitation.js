const { Schema } = require('mongoose');

const invitationSchema = new Schema({
  code: String,
  counter: Number
});

module.exports = invitationSchema;
const shortid = require('shortid');
const mongoose = require('mongoose');

// Initialize invitation schema
const invitationSchema = require('./schemas/invitation');

// middleware - make sure a random uuid is created
invitationSchema.pre('save', function(next) {
  this.uuid = shortid.generate();
  next();
});

invitationSchema.statics = {
  isValid(invitation) {
    this.findOne({ code: invitation }, function(err, inv) {
      if (err) { throw err; }
  
      if (inv) {
        console.log("invitation valid");
        return true;
      } else {
        console.log("invitation invalid");
        return false;
      }
  
    });
  }
}

////////////////////
// ~ Invitation model ~ //
////////////////////
const invitationModel = mongoose.model('Invitation', invitationSchema);

module.exports = invitationModel;
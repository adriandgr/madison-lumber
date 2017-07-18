const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a Schema

const categorySchema = new Schema({
  name: String,
  description: String,
  isRequired: {
    type: Boolean,
    default: false
  },
  uuid: {
    type: String,
    unique: true
  }
});


// middleware - make sure a random uuid is created
categorySchema.pre('save', function(next) {
  this.uuid = shortid.generate();
  next();
});

// create mill category model
const categoryModel = mongoose.model('Category', categorySchema);


// export Model
module.exports = categoryModel;
require('dotenv').config();

const Mill     = require('../app/models/mill');
const mills    = require('../app/models/seed');
const mongoose = require('mongoose');

function setup(cb) {
  // Clear db prior to seeding
  Mill.remove({});
  // Use the Mill model to insert/save
  mills.forEach((mill, i) => {
    var newMill = new Mill(mill);
    newMill.save(err => {
      if(err) {
        console.error(err);
        throw err;
      }
      console.log('New mill created');
    });
  });
}

console.log('Connecting to DB.');
mongoose.connect(process.env.DB_URI);
setup();
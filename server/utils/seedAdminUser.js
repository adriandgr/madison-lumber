require('dotenv').config();

const User     = require('../app/models/user');
const bcrypt  = require('bcrypt');
const mongoose = require('mongoose');

function setup() {
  // create a sample user
  bcrypt.hash(process.env.SEED_PWD, 12, function(err, hash) {
    if (err) {
      console.error(err);
      return;
    }

    const seedUser = {
      firstName: 'Adrian',
      lastName: 'Diaz',
      email: process.env.SEED_EMAIL,
      hash,
      accountType: 'developer',
      admin: true
    };

    const adrian = new User(seedUser);
    adrian.save(function(err) {
      if (err) {
        throw err;
      }
      console.log('User saved successfully');
      mongoose.connection.close();
      console.log('Connection closed.');
    });
  });
}

console.log('Connecting to DB.');
mongoose.connect(process.env.DB_URI);
setup();
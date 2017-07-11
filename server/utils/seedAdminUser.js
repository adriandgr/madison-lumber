require('dotenv').config();

const User     = require('../app/models/user');
const mongoose = require('mongoose');

function setup() {
  // create a sample user
  const seedUser = {
    firstName: 'Adrian',
    lastName: 'Diaz',
    email: process.env.SEED_EMAIL,
    accountType: 'developer',
    password: process.env.SEED_PWD,
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
}

console.log('Connecting to DB.');
mongoose.connect(process.env.DB_URI);
setup();
require('dotenv').config();

const jwt  = require('jsonwebtoken');
const User = require('../models/user');


function authUser(req, res) {

  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) {
      throw err;
    }

    if (!user) {
      req.flash('errors', 'Authentication Failed. Please try again.');
      return res.redirect('/login');
    } else if (user) {

      // check if password matches
      if (user.password !== req.body.password) {
        req.flash('errors', 'Authentication Failed. Please try again.');
        return res.redirect('/login');
      } else {

        // if user is found and password is right
        // create a token and set expiry to 24hrs
        var token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: 86400
        });


        req.session.jwt = token;

        console.log('trying to set token!', token);
        console.log('req.session.jwt', req.session.jwt);

        req.flash('success', `Welcome back ${user.firstName}`);
        res.redirect('/');
      }

    }

  });
}

function showLogin(req, res) {
  res.render('pages/login', {
    errors: req.flash('errors'),
    warnings: req.flash('warnings')
  });
}

function routerMiddleware(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.param('token') || req.headers['x-access-token'] || req.session.jwt;
  // console.log('the token is!', token);
  // console.log('req.session.jwt', req.session.jwt);
  // console.log('all session', req.session);

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        req.flash('errors', 'Authentication Failed. Please try again.');
        return res.redirect('/login');
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    req.flash('warnings', 'Please login to view the requested resource.');
    return res.status(403).redirect('/login');

  }

}

function showUsers(req, res) {
  // get all users
  User.find({}, (err, users) => {
    if (err) {
      res.status(404);
      res.send('Users not found');
    }
    for (user of users) {
      console.log(user['_id'].toString(), typeof user['_id'].toString());
    }
    // return a view with data
    res.render('pages/users', {
      users,
      success: req.flash('success'),
      errors: req.flash('errors')
    });
  });
}

function showCreate(req, res) {
  res.render('pages/createUser', {
    errors: req.flash('errors')
  });
}

function processCreate(req, res) {
  // validate info
  req.checkBody('firstName', 'First name is required.').notEmpty();
  req.checkBody('lastName', 'Last name is required.').notEmpty();
  req.checkBody('email', 'Email is required.').notEmpty();
  req.checkBody('password', 'Password is required.').notEmpty();

  const errors = req.validationErrors();

  if(errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/users/create');
  }

  let isAdmin = false;

  if(req.body.accountType === 'admin') {
    isAdmin = true;
  }

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    accountType: req.body.accountType,
    admin: isAdmin
  });

  user.save((err) => {
    if (err) {
      req.flash('errors', 'Could not save to database. Please try again.');
      res.redirect('/users/create');
    }

    req.flash('success', 'Successfuly created the user!');
    res.redirect('/users');
  });
}

function manageUser(req, res) {
  User.findOne({uuid: req.params.uuid }, (err, user) => {
    if (err) {
      res.status(404);
      res.send('User not found');
    }
    // return a view with data
    res.render('pages/manageUser', {
      user,
      success: req.flash('success'),
      errors: req.flash('errors')
    });
  });
}

function deleteUser(req, res) {
  if (req.decoded._doc.admin) {
    User.findOne({uuid: req.params.uuid }, (err, user) => {
      if (err) {
        res.status(404);
        res.send('User not found');
      }
      if (req.body.email === user.email) {
        User.remove({ uuid: req.params.uuid }, err => {
          req.flash('success', 'User deleted!');
          res.redirect('/users');
        });
      } else {
        req.flash('errors', 'Email does not match. Please try again.');
        res.redirect(`/users/${user.uuid}`);
      }
    });
  } else {
    req.flash('errors', 'Error 403 - Access Forbidden');
    res.redirect('/users/');
  }


}

function logout(req, res) {
  req.session.regenerate(err => {
    console.log(err);
    req.flash('success', 'You\'ve been logged out successfully.');
    res.redirect('/');
  });
}

module.exports = {
  authUser,
  showLogin,
  showUsers,
  manageUser,
  deleteUser,
  showCreate,
  processCreate,
  logout,
  routerMiddleware
};

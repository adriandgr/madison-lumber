require('dotenv').config();

const jwt  = require('jsonwebtoken');
const User = require('../models/user');
const util = require('util');


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
        // create a token and set expiry to 24hrs
        var token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: 86400
        });

        req.session.jwt = token;

        req.flash('success', `Welcome back ${user.firstName}`);
        res.redirect('/');
      }

    }

  });
}

function authUserTwo(req, res) {
  const token = req.body.token;
  if (token) {
    return jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        return res.json({ error: 'Authentication Failed. Please try again.' });
      } else {
        req.decoded = decoded;
        res.json({
          token,
          user: decoded._doc.firstName,
          isAdmin: decoded._doc.admin
        });
      }
    });
  }

  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      throw err;
    }

    if (!user) {
      return res.json({ error: 'Authentication Failed. Please try again.' });
    } else if (user) {
      if (user.password !== req.body.password) {
        return res.json({ error: 'Authentication Failed. Please try again.' });
      } else {
        // create a token and set expiry to 24hrs
        var token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: 86400
        });

        req.session.jwt = token;

        //req.flash('success', `Welcome back ${user.firstName}`);
        res.json({
          token,
          user: user.firstName,
          isAdmin: user.admin
        });
      }
    }
  });
}

function getLogin(req, res) {
  res.json({
    errors: req.flash('errors'),
    validToken: req.flash('validToken'),
    warnings: req.flash('warnings')
  });
}

function routerMiddleware(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.param('token') || req.headers['x-access-token'] || req.session.jwt;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        req.flash('validToken', false);
        req.flash();
        return res.json({
          errors: ['Authentication Failed. Please log in and try again.']});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        req.flash('validToken', true);
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    req.flash('validToken', false);
    req.flash('warnings', 'Please login to view the requested resource.');
    return res.status(403).redirect('/login');
  }
}

function adminMiddleware(req, res, next) {
  if (req.decoded._doc.admin) {
    next();
  } else {
    res.json({
      errors: [
        '403 - Forbidden',
        'The server understood the request but refuses to authorize it.',
        'You do not have administrative priviledges to view the requested resource.']
    });
  }
}

function getUsers(req, res) {
  // get all users
  User.find({}, (err, users) => {
    if (err) {
      res.status(404);
      res.send('Users not found');
    }
    // return a view with data
    res.json({
      users,
      success: req.flash('success'),
      errors: req.flash('errors')
    });
  });
}

function showCreate(req, res) {
  res.render('pages/createUser', {
    validToken: req.flash('validToken'),
    errors: req.flash('errors')
  });
}

function processCreate(req, res) {
  // validate info
  req.checkBody('firstName', 'First name is required.').notEmpty();
  req.checkBody('lastName', 'Last name is required.').notEmpty();
  req.checkBody('email', 'Valid email is required.').isEmail();
  req.checkBody('password', 'Password should be between 8 and 30 characters long').len(8,30);

  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      const val = result.array().map(err => err.msg);
      const errors = ['Validation Errors:'].concat(val);
      console.log(errors, req.body.password)
      res.json({
        errors
      });
      return;
    }

    let isAdmin = false;

    if (req.body.accountType === 'admin') {
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

      res.json({
        success: 'Successfuly created the user!'
      });
    });
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
      validToken: req.flash('validToken'),
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
  authUserTwo,
  getLogin,
  getUsers,
  manageUser,
  deleteUser,
  showCreate,
  processCreate,
  logout,
  routerMiddleware,
  adminMiddleware
};

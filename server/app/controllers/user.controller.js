require('dotenv').config();

const jwt     = require('jsonwebtoken');
const User    = require('../models/user');
const util    = require('util');
const bcrypt  = require('bcrypt');
const saltRounds = 12;

function validateToken(req, res) {
  console.log('heyyyyyyy', req.session.cookie)
  const token = req.body.token;
  if (token) {
    return jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        return res.status(403).json({ error: 'Authentication Failed. Bad token.' });
      } else {
        req.decoded = decoded;
        req.session.jwt = token;
        res.cookie('session_id', token, {maxAge: 30000});
        res.json({
          token,
          user: decoded._doc.firstName,
          isAdmin: decoded._doc.admin
        });
      }
    });
  }
}

function authUser(req, res) {
  req.checkBody('email', 'Email may not be blank.').notEmpty();
  req.checkBody('password', 'Password may not be blank').notEmpty();

  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      const val = result.array().map(err => err.msg);
      const errors = ['Validation Errors:'].concat(val);
      return res.json({
        errors
      });
    }

    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) { throw err; }

      if (!user) {
        return res.status(403).json({ errors: ['403 - Forbidden', 'Authentication Failed. Please try again.'] });
      }

      bcrypt.compare(req.body.password, user.hash, function(err, comp) {
        if (err) {
          return res.json({ errors: ['Error 500', 'Internal Server Error (bcrypt). Please try again.']});
        }

        if (comp === false) {
          return res.json({ errors: ['403 - Forbidden', 'Authentication Failed. Please try again.'] });
        }

        if (comp === true) {
          // create a token and set expiry to 24hrs
          const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: 86400
          });

          req.session.jwt = token;
          console.log(token);
          return res.json({
            token,
            user: user.firstName,
            isAdmin: user.admin
          });
        }
      });
    });
  });
}

function getLogin(req, res) {
  res.json({
    errors: req.flash('errors'),
    warnings: req.flash('warnings')
  });
}

function routerMiddleware(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.cookies.session_id || req.body.token || req.param('token') || req.headers['x-access-token'] || req.session.jwt;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        return res.status(401).json({
          errors: ['Authentication Failed. Please log in and try again.']});
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
      res.json({
        errors: ['Users not found', 'The target user could not be found']});
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
    errors: req.flash('errors')
  });
}

function processCreate(req, res) {
  // validate info
  req.checkBody('firstName', 'First name is required.').notEmpty();
  req.checkBody('lastName', 'Last name is required.').notEmpty();
  req.checkBody('email', 'Valid email is required.').isEmail();
  req.checkBody('password', 'Password should be between 8 and 30 characters long').len(8, 30);

  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      const val = result.array().map(err => err.msg);
      const errors = ['Validation Errors:'].concat(val);
      return res.json({
        errors
      });
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if (err) {
        return res.json({errors: ['Error 500', 'Internal Server Error. Please try again.']});
      }

      let isAdmin = false;

      if (req.body.accountType === 'admin') {
        isAdmin = true;
      }

      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hash,
        accountType: req.body.accountType,
        admin: isAdmin
      });

      user.save((err) => {
        if (err) {
          return res.json({errors: ['Error 500', 'Internal Server Error. Please try again.']});
        }

        res.json({
          success: 'Successfully created the user!'
        });
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
    res.json({
      user,
      success: req.flash('success'),
      errors: req.flash('errors')
    });
  });
}

function deleteUser(req, res) {
  console.log('request body', req.body);
  if (req.decoded._doc.admin) {
    User.findOne({email: req.body.email }, (err, user) => {
      if (err) {
        res.status(500);
        return res.json({
          errors: ['505 - Internal Server Error', 'Something went wrong; please try again']
        });
      }
      if(user) {
        // Found user in database
        if(user.email === req.body.email) {
          User.remove({ uuid: req.params.uuid }, err => {
            return res.json({
              success: ['User deleted!']
            });
          });
        }
      } else {
        // Did not find email in db, meaning it doesn't match
        return res.json({
          errors: ['Error — Email does not match', 'Please try again']
        });
      }
    });
  } else {
    res.json({
      errors: ['Error 403 - Access Forbidden']
    });
  }
}

function logout(req, res) {
  req.session.regenerate(err => {
    console.error(err);
    req.flash('success', 'You\'ve been logged out successfully.');
    res.redirect('/');
  });
}

module.exports = {
  validateToken,
  authUser,
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

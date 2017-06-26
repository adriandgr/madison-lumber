const Mill = require('../models/mill');
const mills = require('../models/seed');

/**
  * Show All Events
  **/
function showEvents(req, res) {
  // get all mills
  Mill.find({}, (err, mills) => {
    if (err) {
      res.status(404);
      res.send('Events not found');
    }
    // return a view with data
    res.render('pages/mills', {
      mills,
      success: req.flash('success')
    });
  });
}

/**
  * Show single mill
  **/
function showSingle(req, res) {

  Mill.findOne({slug: req.params.slug }, (err, mill) => {
    if (err) {
      res.status(404);
      res.send('Mill not found');
    }
    console.log('mill', mill);
    // return a view with data
    res.render('pages/single', {
      mill,
      success: req.flash('success')
    });
  });

}

/**
  * Seed the Database
  **/
function seedEvents(req, res) {

  // clear db prior to seeding
  Mill.remove({}, () => {
    // use the Mill model to insert/save
    for (mill of mills) {
      var newEvent = new Mill(mill);
      newEvent.save();
    }
  });


  // seeded
  res.send('database seeded');
}

/**
  * Show Create
  **/
function showCreate(req, res) {
  res.render('pages/createMill', {
    errors: req.flash('errors')
  });
}

/**
  * Process Create
  **/
function processCreate(req, res) {
  // validate info
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  const errors = req.validationErrors();

  if(errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/mills/create');
  }

  const mill = new Mill({
    name: req.body.name,
    description: req.body.description
  });

  mill.save((err) => {
    if (err) {
      throw err;
    }

    req.flash('success', 'Successfuly created the mill!');
    res.redirect(`/mills/${mill.slug}`);
  });
}

/**
* Show the edit form
**/
function showEdit(req, res) {
  Mill.findOne({ slug: req.params.slug }, (err, mill) => {
    res.render('pages/edit', {
      mill,
      errors: req.flash('errors')
    });
  });
}

/**
* Process Edit
**/
function processEdit(req, res) {
  // validate info
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  const errors = req.validationErrors();

  if(errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/mills/${req.params.slug}/edit`);
  }

  // find the mill
  Mill.findOne({ slug: req.params.slug }, (err, mill) => {
    //  update the mill
    mill.name        = req.body.name;
    mill.description = req.body.description;

    mill.save((err) => {
      if(err) {
        throw err;
      }
      // success flash message
      req.flash('success', 'Successfully updated the mill.');
      // redirect back to the /mills
      res.redirect('/mills');
    });
  });
}

function deleteEvent(req, res) {
  Mill.remove({ slug: req.params.slug }, err => {
    req.flash('success', 'Mill deleted!');
    res.redirect('/mills');
  });
}

module.exports = {
  showEvents,
  showSingle,
  seedEvents,
  showCreate,
  processCreate,
  showEdit,
  processEdit,
  deleteEvent
};

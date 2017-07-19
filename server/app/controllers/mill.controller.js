const Mill = require('../models/mill');
const mills = require('../models/seed');

/**
  * Show All Events
  **/
function showMills(req, res) {
  // get all mills
  if (req.query.q) {
    req.flash('query', req.query.q);
    Mill.find({$text: {$search: req.query.q}}, (err, mills) => {
      if (err) {
        res.status(404);
        res.send('Events not found');
      }
      res.render('pages/mills', {
        mills,
        validToken: req.flash('validToken'),
        success: req.flash('success'),
        query: req.flash('query')
      });
    });
  } else {
    Mill.find({}, (err, mills) => {
      if (err) {
        res.status(404);
        res.send('Events not found');
      }
      res.json({
        mills,
        validToken: req.flash('validToken'),
        success: req.flash('success'),
        query: req.flash('query')
      });
    });
  }


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
      validToken: req.flash('validToken'),
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
    validToken: req.flash('validToken'),
    errors: req.flash('errors')
  });
}

/**
  * Process Create
  **/
function processCreate(req, res) {
  // validate info
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('type', 'Type is required.').notEmpty();
  req.checkBody('region', 'Region is required.').notEmpty();


  const errors = req.validationErrors();

  if(errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/mills/create');
  }

  const mill = new Mill({
    name: req.body.name,
    type: req.body.type,
    region: req.body.region,
    contact: {
      address: req.body.address,
      location: req.body.location,
      phone: req.body.phone,
      fax: req.body.fax,
      website: req.body.website,
      contactPersons: req.body.contactPersons.split(", ")
    },
    catalog: {
      products: req.body.products.split(", "),
      species: req.body.species.split(", "),
      roughSizes: req.body.roughSizes.split(", "),
      surfacedSizes: req.body.surfacedSizes,
      production: req.body.production,
      panelThickness: req.body.panelThickness,
      services: req.body.services.split(", "),
      kilnCapacity: req.body.kilnCapacity,
      shipping: req.body.shipping.split(", "),
      export: req.body.export.split(", ")
    },
    qualifications: {
      gradingAgency: req.body.gradingAgency,
      memberOf: req.body.memberOf.split(", "),
      employees: req.body.employees,
      notes: req.body.notes,
      certification: req.body.certification,
      preservatives: req.body.preservatives,
      treatingFacilities: req.body.treatingFacilities,
      distributionYard: req.body.distributionYard,
      millStatus: req.body.millStatus
    },
    lastUpdated: Date.now()
  });

  mill.save((err) => {
    if (err) {
      req.flash('errors', 'Database Error: Mill Already Exists!');
      req.flash('errors', 'Please update existing record or choose a different name.');
      return res.redirect('/mills/create');
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
      validToken: req.flash('validToken'),
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
  showMills,
  showSingle,
  seedEvents,
  showCreate,
  processCreate,
  showEdit,
  processEdit,
  deleteEvent
};

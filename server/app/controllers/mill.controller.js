const Mill = require('../models/mill');
const mills = require('../models/seed');

/**
  * Show All Events
  **/
function showMills(req, res) {
  // get all mills
  if (req.query.q) {
    req.flash('query', req.query.q);
    Mill.paginate({$text: {$search: `"${req.query.q}"`}}, { page: req.query.p, limit: Number(req.query.limit) })
      .then(mills => {
        res.json({
          mills: mills.docs,
          total: mills.total,
          limit: mills.limit,
          page: mills.page,
          pages: mills.pages,
          success: req.flash('success'),
          query: req.flash('query')
        });
      })
      .catch(err => {
        console.error(err);
        res.status(404);
        res.send('Events not found');
      });
  } else {
    Mill.paginate({}, { page: req.query.p, limit: Number(req.query.limit) })
      .then(mills => {
        res.json({
          mills: mills.docs,
          total: mills.total,
          limit: mills.limit,
          page: mills.page,
          pages: mills.pages,
          success: req.flash('success'),
          query: req.flash('query')
        });
      })
      .catch(err => {
        console.error(err);
        res.status(404);
        res.send('Events not found');
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
      res.json({
        errors: ['404: Mill not found']
      });
    }
    // return a view with data
    res.json({
      mill,
      success: req.flash('success'),
      errors: []
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
  req.checkBody('type', 'Type is required.').notEmpty();
  req.checkBody('region', 'Region is required.').notEmpty();

  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      const val = result.array().map(err => err.msg);
      const errors = ['Validation Errors:'].concat(val);
      console.log(errors);
      return res.json({
        errors
      });
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
        return res.json({
          errors: ['Error 500', 'Internal Server Error. Please try again.']
        });
      }

      res.json({
        success: 'Successfully created mill record!'
      });
    });
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

function deleteMill(req, res) {
  Mill.remove({ slug: req.params.slug }, (err, db) => {
    if (db.result.n === 0) {
      // if mill entry is not found return an error
      return res.json({errors: ['Error 500', 'Internal server error.']});
    }
    res.json({success: ['Sucess', 'The mill was removed from the database.']});
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
  deleteMill
};

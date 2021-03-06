const Mill = require('../models/mill');
const mills = require('../models/seed');

/**
  * Show All Events
  **/
function showMills(req, res) {
  console.log("query received is: " + req.query.q);
  // construct a query object (constructedQuery) before using paginate
  let query = ' ';
  let regions = [];
  let types = [];
  let products = [];
  let species = [];
  let constructedQuery = {};
  if (req.query.q)  {
    query = req.query.q.split(' ').map(q => `"${q}"`);
    constructedQuery.$text = {$search: `${query}`};
  }
  if (req.query.r)  {
    regions = req.query.r.split(',');
    constructedQuery.region = { $in: regions };
  }
  if (req.query.t)  {
    types = req.query.t.split(',');
    types = types.map( type => { return new RegExp(type, 'i') } );
    constructedQuery.type = { $in: types };
  }
  if (req.query.pr)  {
    products = req.query.pr.split(',');
    products = products.map( product => { return new RegExp(product, 'i') } );
    constructedQuery["catalog.products"] = { $in: products };
  }
  if (req.query.sp)  {
    species = req.query.sp.split(',');
    species = species.map( sp => { return new RegExp(sp, 'i')} );
    constructedQuery["catalog.species"] = { $in: species };
  }
  console.log(req.query.p);
  console.log(constructedQuery);
  Mill.paginate( constructedQuery, { page: req.query.p, limit: Number(req.query.limit) })
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

/**
  * Show single mill
  **/
function showSingle(req, res) {

  Mill.findOne({_id: req.params.id }, (err, mill) => {
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
* Process Edit
**/
function processEdit(req, res) {
  let [[ millKeys, val ]] = Object.entries(req.body.options);
  millKeys = millKeys.split('.');

  Mill.findOne({uuid: req.body.uuid }, (err, mill) => {
    // Accounts for nested nature of mill schema
    if(millKeys.length === 1) {
      const [ key ] = millKeys;
      mill[key] = val;
    } else {
      let temp;
      millKeys.forEach((key, i) => {
        if(i === 0) {
          temp = mill[key];
        } else if(i > 0 && i < (millKeys.length - 1)) {
          temp = temp[key];
        } else {
          mill = temp;
          mill[key] = val;
        }
      });
    }

    mill.save(err => {
      if(err) {
        return res.json({
          errors: ['500 - Internal Server Error', 'Internal Server Error. Please try again.']
        });
      }
      return res.json({
        success: ['Successfully Updated', `${req.body.sectionName} has been updated successfully`]
      });
    });
  });
}

function deleteMill(req, res) {
  Mill.remove({ uuid: req.params.uuid }, (err, db) => {
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
  processEdit,
  deleteMill
};

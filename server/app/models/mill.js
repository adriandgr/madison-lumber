const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueSlugs = require('mongoose-uniqueslugs');

mongoose.Promise = global.Promise;

//create a Schema

const millSchema = new Schema({
  name: String,
  type: String,
  region: String,
  contact: {
    address: String,
    location: String,
    phone: Array,
    fax: String,
    website: String,
    email: String,
    contactPersons: Array
  },
  catalog: {
    products: Array,
    species: Array,
    roughSizes: Array,
    surfacedSizes: Array,
    production: String,
    panelThickness: String,
    services: Array,
    kilnCapacity: String,
    shipping: Array,
    export: Array
  },
  qualifications: {
    gradingAgency: String,
    memberOf: Array,
    employees: String,
    notes: String,
    certification: String,
    preservatives: String,
    treatingFacilities: String,
    distributionYard: String,
    millStatus: String
  },
  lastUpdated: Date
});

millSchema.index(
  {
    name: 'text',
    type: 'text',
    region: 'text',
    'contact.address': 'text',
    'contact.contactPersons': 'text',
    'catalog.products': 'text',
    'catalog.species': 'text',
    'catalog.services': 'text'
  },
  {
    name: 'mill_index',
    weights: {
      name: 10,
      'catalog.products': 6,
      'catalog.species': 6,
      'catalog.services': 6,
      type: 3,
      region: 3,
      'contact.address': 1,
      'contact.contactPersons': 1
    }
  }
);

uniqueSlugs.enhanceSchema(millSchema, {source: 'name'});

// function to slugify a name
// function slugify(mill, next) {
//   let base = mill.name.toString().toLowerCase()
//     .replace(/\s+/g, '-')           // Replace spaces with -
//     .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
//     .replace(/\-\-+/g, '-')         // Replace multiple - with single -
//     .replace(/^-+/, '')             // Trim - from start of text
//     .replace(/-+$/, '');            // Trim - from end of text

//   mill.constructor.find({slug: { '$regex': base } })
//     .then(docs => {
//       if(docs.length > 0) {
//         // Highest version number out of existing slugs
//         const heighest = docs.map(doc => Number(doc.slug.split('-').pop()) )
//                              .sort((a, b) => (a - b))
//                              .pop();
//         mill.slug = `${base}-${heighest + (Math.floor(Math.random() * 5) + 3)}`;
//         next();
//       } else {
//         mill.slug = `${base}-1`;
//         next();
//       }
//     })
//     .catch(err => {
//       console.error(err);
//       next();
//     });
// }

// middleware - make sure slug is created from the name; ensure it's unique
// millSchema.pre('save', true, function(next) {
//   this.slug = slugify(this, next);
// });

// create mill model

const millModel = mongoose.model('Mill', millSchema);

uniqueSlugs.enhanceModel(millModel);

// export Model

module.exports = millModel;
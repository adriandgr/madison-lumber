const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueSlugs = require('mongoose-uniqueslugs');
const mongoosePaginate = require('mongoose-paginate');

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

// Modifies schema for use of uniqueSlugs
uniqueSlugs.enhanceSchema(millSchema, {source: 'name'});

// Adds paginate plugin to schema
millSchema.plugin(mongoosePaginate);

// ~Mill model~
const millModel = mongoose.model('Mill', millSchema);

// Allows for retry on save (to avoid dup key errors on bulk import) for mill model
uniqueSlugs.enhanceModel(millModel);

// Exports Model
module.exports = millModel;
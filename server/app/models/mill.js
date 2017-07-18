const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    contactPersons: Array
  },
  catalog: {
    products: Array,
    species: Array,
    roughSizes: Array,
    surfacedSizes: String,
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
    employees: Number,
    notes: String,
    certification: String,
    preservatives: String,
    treatingFacilities: String,
    distributionYard: String,
    millStatus: String
  },
  lastUpdated: Date,
  slug: {
    type: String,
    unique: true
  }
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



// middleware - make sure slug is created from the name
millSchema.pre('save', function(next) {
  this.slug = slugify(this.name);
  next();
});

// function to slugify a name
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// create mill model

const millModel = mongoose.model('Mill', millSchema);


// export Model

module.exports = millModel;
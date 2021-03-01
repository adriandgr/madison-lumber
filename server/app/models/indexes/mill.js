const millIndex = {
  type: {
    name: 'text',
    'qualifications.gradingAgency': 'text'
  },
  options: {
    name: 'mill_index',
    weights: {
      name: 10,
      'qualifications.gradingAgency': 8
    }
  }
};

module.exports = millIndex;

/*
    type: 'text',
    region: 'text',
    'contact.address': 'text',
    'contact.contactPersons': 'text',
    'catalog.products': 'text',
    'catalog.species': 'text',
    'catalog.services': 'text',
    'catalog.export': 'text',
    'catalog.shipping': 'text',
*/
/*
      'catalog.products': 6,
      'catalog.species': 6,
      'catalog.services': 6,
      'catalog.export': 6,
      'catalog.shipping': 6,
      type: 3,
      region: 3,
      'contact.address': 1,
      'contact.contactPersons': 1
*/
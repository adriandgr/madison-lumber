const sample = {
  name: '',
  type: '',
  region: '',
  contact: {
    address: '',
    location: '',
    phone: '',
    fax: '',
    website: '',
    contactPersons: []
  },
  qualifications: {
    products: '',
    species: '',
    roughSizes: '',
    surfacedSizes: '',
    production: '',
    panelThickness: '',
    services: '',
    kilnCapacity: '',
    shipping: ''
  },
  catalog: {
    export: '',
    gradingAgency: '',
    memberOf: '',
    employees: '',
    notes: '',
    certification: '',
    preservatives: '',
    treatingFacilities: '',
    distributionYard: '',
    millStatus: ''
  }
};

const keys = Object.keys(sample);
const millKeys = [];

keys.forEach(key => {
  if(typeof sample[key] === 'object' && !Array.isArray(sample[key])) {
    let newKeys = Object.keys(sample[key]);
    newKeys.forEach(newKey => {
      millKeys.push(`${key}.${newKey}`);
    });
  } else {
    millKeys.push(key);
  }
});

console.log(millKeys);
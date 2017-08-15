require('dotenv').config();

const mongoose = require('mongoose');
const convert  = require('xls-to-json');
const input    = './utils/files/MadDirectory2016FinalAdrian.xls';
const Mill     = require('../app/models/mill');

function mapMills(raw) {
  return raw
    .filter(mill => mill['Name of mill'] !== '')
    .map(mill => {
      return {
        name: mill['Name of mill'],
        type: mill['Type of mill'],
        region: mill['Region'],
        qualifications: {
          employees: mill['Employees'],
          memberOf: mill['Member of'].split(','),
          notes: mill['Notes'],
          gradingAgency: mill['Grading Agency'],
          certification: mill['Certification'],
          preservatives: mill['Preservatives'],
          treatingFacilities: mill['Treating Facilities'],
          distributionYard: mill['Distribution Yard'],
          millStatus: mill['Mill Status']
        },
        catalog: {
          production: mill['Production'],
          panelThickness: mill['Panel Thickness'],
          kilnCapacity: mill['Kiln Capacity'],
          export: mill['Export'].split(','),
          shipping: mill['Shipping'].split(','),
          services: mill['Services'].split(','),
          surfacedSizes: mill['Surfaced Sizes'].replace(/;\W?|,\W?/g, 'split_me').split('split_me'),
          roughSizes: mill['Rough Sizes'].split(','),
          species: mill['Species'].split(','),
          products: mill['Products'].split(',')
        },
        contact: {
          address: mill['Contact Address'],
          location: mill['Mill location'],
          fax: mill['Fax'],
          website: mill['Website'],
          email: mill['Email'],
          contactPersons: mill['Contact persons'].split(','),
          phone: mill['Phone'].split(',')
        },
        lastUpdated: mill['Last Updated']
      };
    });
}

function insertMills(mills) {
  console.log('Opening db connection');
  mongoose.connect(process.env.DB_URI);

  let newMill;
  mills.forEach((mill, i) => {
    newMill = new Mill(mill);
    newMill.save((err, res) => {
      if(err) {
        throw err;
      }
      if((i + 1) === mills.length) {
        console.log('Closing db connection');
        mongoose.connection.close();
        console.log(`${i + 1} insertions completed`);
      }
    });
  });
}

convert({input: input, output: null}, function(err, raw) {
  if(err) {
    throw err;
  }
  insertMills(mapMills(raw));
});
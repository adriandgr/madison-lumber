require('dotenv').config();

const mongoose = require('mongoose');
const convert  = require('xlsx-to-json');
const input    = './utils/files/MadDirectory2020print.xlsx';
const Mill     = require('../app/models/mill');
const millSchema = require('../app/models/schemas/mill');
const millIndex = require('../app/models/indexes/mill');
const { buildIndex, dropIndex } = require('../app/models/modelUtils');

function mapMills(raw) {
  return raw
    .filter(mill => mill['Name of mill'] !== '')
    .map(mill => {
      return {
        name: mill['Name of mill'],
        type: mill['Type of mill'],
        region: mill['Region'].replace('Canada, ',''),
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
          surfacedSizes: mill['Surfaced Sizes'].split(','),
          roughSizes: mill['Rough Sizes'].split(','),
          species: mill['Species'].split(','),
          products: mill['Products'].split(',')
        },
        contact: {
          address: mill['Contact Address'],
          location: mill['Mill location'],
          fax: mill['Fax'],
          website: mill['Website'],
          email: mill['Email'].split(','),
          contactPersons: mill['Contact persons'].split(','),
          phone: mill['Phone'].split(','),
          latitude: mill['Latitude'],
          longitude: mill['Longitude']
        },
        lastUpdated: mill['Last Updated']
      };
    });
}

function insertMills(mills) {
  console.log('Opening db connection');
  mongoose.connect(process.env.DB_URI );
/*   console.log("Removing all mills");
  Mill.remove(function(err,removed) {
    if(err) {
      throw err;
    }
    console.log(removed + " mills removed.")
  }); */
  console.log("Importing mills");
  mills.forEach((mill, i) => {
    const newMill = new Mill(mill);
    newMill.save((err, res) => {
      if(err) {
        console.log("newMill.save() failed with error: ");
        console.log(err);
        throw err;
      }
      if((i + 1) === mills.length) {
        dropIndex({ model: Mill, index: 'mill_index' });
        buildIndex({ schema: millSchema, index: millIndex });
        console.log('Closing db connection');
        mongoose.connection.close();
        console.log(`${i + 1} insertions completed`);
      }
    });
  });
}

convert({input: input, output: null}, function(err, raw) {
  if(err) {
    console.log("xls conversion failed");
    throw err;
  }
  insertMills(mapMills(raw));
});